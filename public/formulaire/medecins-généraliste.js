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
      const lignes = csv.trim().split("\n");
      const headers = lignes[0].split(",");
      medecins = lignes.slice(1).map(l => {
        const champs = l.split(",");
        return Object.fromEntries(headers.map((h, i) => [h.trim(), champs[i]?.trim() || ""]));
      });
      
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

    });
};

function normalize(str) {
  return (str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s\-']/g, "")
    .replace(/[\s\-]+/g, " ")
    .trim()
    .toLowerCase();
}

function afficheMedecin() {
  const villeChoisie = document.getElementById("ville-select").value;
  const villeNorm = normalize(villeChoisie);

  const resultats = medecins.filter(m => {
    const villeMed = normalize(m["Libellé commune (coord. structure)"]);
    const specialite = normalize(m["Libellé savoir-faire_x"]);
    return villeMed === villeNorm && specialite.includes("medecine generale");
  });

  const cont = document.getElementById("resultats");
  cont.innerHTML = "";

  if (resultats.length === 0) {
    cont.innerHTML = "<p>Aucun médecin généraliste trouvé dans cette ville.</p>";
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
  });
}

