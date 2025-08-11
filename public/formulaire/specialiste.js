let medecins = [];


function normalize(str) {
  return (str || "")
    .normalize("NFD") // Supprime les accents
    .replace(/[\u0300-\u036f]/g, "") // Supprime les marques d'accent
    .replace(/[^a-zA-Z0-9\s\-']/g, "") // Supprime les caractères spéciaux sauf tirets et apostrophes
    .replace(/[\s\-]+/g, " ") // Unifie les tirets et espaces
    .trim()
    .toLowerCase();
}

window.onload = () => {
  fetch("medecins_var.csv")
    .then(res => res.text())
    .then(csv => {
        console.log("Contenu CSV brut :", csv.slice(0, 500));
      const lignes = csv.trim().split("\n");
      const headers = lignes[0].split(",");
      medecins = lignes.slice(1).map(l => {
        const champs = l.split(",");
        return Object.fromEntries(headers.map((h, i) => [h.trim(), champs[i]?.trim() || ""]));
      });

      console.log("Exemple médecin :", medecins[0]);
      
      const villes = [...new Set(
        medecins.map(m=> m["Libellé commune (coord. structure)"]).filter(Boolean)
      )].sort()

      const select = document.getElementById("ville-select");
      villes.forEach(v => {
        const opt = document.createElement("option");
        opt.value=v;
        opt.textContent = v;
        select.appendChild(opt)
      });

      const specialite = [...new Set(
        medecins.map(m=> m["Libellé savoir-faire_x"]).filter(Boolean)
      )].sort()

      const spe = document.getElementById("spe-select");
      specialite.forEach(s => {
        const opt = document.createElement("option");
        opt.value=s;
        opt.textContent = s;
        spe.appendChild(opt)
      });

      console.log("Nombre de spécialités :", specialite.length);
      console.log("Exemple spécialité :", specialite[0]);


    });
};

function afficheMedecin() {
  const villeChoisie = document.getElementById("ville-select").value;
  const villeNorm = normalize(villeChoisie);
  const speChoisie = document.getElementById("spe-select").value;
  const speNorm = normalize(speChoisie);


  const resultats = medecins.filter(m => {
    const villeMed = normalize(m["Libellé commune (coord. structure)"]);
    const specialite = normalize(m["Libellé savoir-faire_x"]);
    return villeMed === villeNorm && specialite == speNorm;
  });

  const cont = document.getElementById("resultats");
  cont.innerHTML = "";

  if (resultats.length === 0) {
    cont.innerHTML = "<p>Aucun spécialiste trouvé dans cette ville. Vous pouvez essayer avec une autre ville proche de chez vous.</p>";
    return;
  }

  resultats.forEach(m => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${m["Nom d'exercice_x"] || ""} ${m["Prénom d'exercice_x"] || ""}</strong><br>
      ${m["Libellé savoir-faire_x"] || ""} - ${m["Libellé commune (coord. structure)"] || ""}<br>
      ${[m["Numéro Voie (coord. structure)"], m["Libellé type de voie (coord. structure)"], m["Libellé Voie (coord. structure)"]].filter(Boolean).join(" ")}<br>
      📞 ${m["Téléphone (coord. structure)"] || "Non renseigné"}
      <hr>
    `;
    cont.appendChild(div);
  })
};