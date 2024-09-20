document.addEventListener('DOMContentLoaded', () => {
  const teamInfo = document.getElementById('team-info');
  const resetButton = document.getElementById('reset-game');
  const nextDayButton = document.getElementById('next-day');
  const currentDaySpan = document.getElementById('current-day');
  const matchesList = document.getElementById('matches');
  const teamSelectionDiv = document.getElementById('team-selection');

  // Équipes et joueurs pré-définis
  const initialData = {
    teams: [
      { id: 1, name: 'T1', funds: 10000000, playersIDs: [0, 1, 2, 3, 4] },
      { id: 2, name: 'KCorp', funds: 3000000, playersIDs: [5, 6, 7, 8, 9] },
      { id: 3, name: 'G2', funds: 5000000, playersIDs: [14, 15, 16, 17, 18] },
      { id: 4, name: 'Fnatic', funds: 2000000, playersIDs: [19, 20, 21, 22, 23] },
    ],
    players: [
      { id: 0, name: 'Zeus', role: 'Top', teamID: 1, score: 160, dailySalary: 600 },
      { id: 1, name: 'Canyon', role: 'Jungle', teamID: 1, score: 210, dailySalary: 1300 },
      { id: 2, name: 'Faker', role: 'Mid', teamID: 1, score: 210, dailySalary: 5000 },
      { id: 3, name: 'Gumayusi', role: 'ADC', teamID: 1, score: 180, dailySalary: 900 },
      { id: 4, name: 'Keria', role: 'Support', teamID: 1, score: 160, dailySalary: 900 },
      { id: 5, name: 'Canna', role: 'Top', teamID: 2, score: 100, dailySalary: 500 },
      { id: 6, name: 'Bo', role: 'Jungle', teamID: 2, score: 110, dailySalary: 500 },
      { id: 7, name: 'Vladi', role: 'Mid', teamID: 2, score: 110, dailySalary: 400 },
      { id: 8, name: 'Caliste', role: 'ADC', teamID: 2, score: 140, dailySalary: 400 },
      { id: 9, name: 'Targamas', role: 'Support', teamID: 2, score: 95, dailySalary: 550 },
      { id: 14, name: 'BrokenBlade', role: 'Top', teamID: 3, score: 150, dailySalary: 700 },
      { id: 15, name: 'Yike', role: 'Jungle', teamID: 3, score: 140, dailySalary: 600 },
      { id: 16, name: 'Caps', role: 'Mid', teamID: 3, score: 180, dailySalary: 1600 },
      { id: 17, name: 'Mikyx', role: 'ADC', teamID: 3, score: 150, dailySalary: 500 },
      { id: 18, name: 'Rodrigo', role: 'Support', teamID: 3, score: 110, dailySalary: 350 },
      { id: 19, name: 'Oscarinin', role: 'Top', teamID: 4, score: 115, dailySalary: 500 },
      { id: 20, name: 'Razork', role: 'Jungle', teamID: 4, score: 120, dailySalary: 600 },
      { id: 21, name: 'Humanoid', role: 'Mid', teamID: 4, score: 170, dailySalary: 800 },
      { id: 22, name: 'Noah', role: 'ADC', teamID: 4, score: 145, dailySalary: 400 },
      { id: 23, name: 'Jun', role: 'Support', teamID: 4, score: 125, dailySalary: 400 },
      { id: 23, name: 'Nisqy', role: 'Mid', teamID: 0, score: 155, dailySalary: 400 },
      { id: 23, name: 'Kameto', role: 'Jungle', teamID: 0, score: 30, dailySalary: 1 },
      { id: 23, name: 'Wao', role: 'Top', teamID: 0, score: 90, dailySalary: 300 },
    ],
    matches: [
      { id: 0, day: 1, teamA_id: 1, teamB_id: 2, scoreA: 0, scoreB: 0 },
      { id: 1, day: 1, teamA_id: 3, teamB_id: 4, scoreA: 0, scoreB: 0 },
      { id: 2, day: 2, teamA_id: 1, teamB_id: 3, scoreA: 0, scoreB: 0 },
    ],
  };

  // Fonction pour initialiser les données dans le localStorage
  function initGame() {
    if (!localStorage.getItem('teams')) {
      localStorage.setItem('teams', JSON.stringify(initialData.teams));
      localStorage.setItem('players', JSON.stringify(initialData.players));
      localStorage.setItem('matches', JSON.stringify(initialData.matches));
      localStorage.setItem('currentDay', '0');
    }
  }

  // Charger les équipes dans l'interface
  function loadTeams() {
    const teams = JSON.parse(localStorage.getItem('teams'));
    teamSelectionDiv.innerHTML = ''; // Effacer les équipes existantes
    teams.forEach(team => {
      const teamCard = document.createElement('div');
      teamCard.classList.add('team-card');

      const teamName = document.createElement('div');
      teamName.classList.add('team-name');
      teamName.textContent = team.name;

      const members = document.createElement('div');
      members.classList.add('members');
      members.innerHTML = initialData.players
        .filter(player => player.teamID === team.id)
        .map(player => `${player.name} (${player.role})`).join('<br>');

      const chooseButton = document.createElement('button');
      chooseButton.classList.add('choose-button');
      chooseButton.textContent = 'Choisir';
      chooseButton.addEventListener('click', () => selectTeam(team));

      teamCard.appendChild(teamName);
      teamCard.appendChild(members);
      teamCard.appendChild(chooseButton);
      teamSelectionDiv.appendChild(teamCard);
    });
  }

  // Sélection d'une équipe
  function selectTeam(team) {
    if (!localStorage.getItem('selectedTeam')) {
      localStorage.setItem('selectedTeam', JSON.stringify(team));
      teamInfo.textContent = `Votre équipe : ${team.name} (Fonds: ${team.funds} €)`;
      teamSelectionDiv.style.display = 'none'; // Masquer la section de sélection
    } else {
      alert('Vous avez déjà sélectionné une équipe.');
    }
  }

  // Charger l'équipe sélectionnée depuis le localStorage
  function loadTeam() {
    const savedTeam = localStorage.getItem('selectedTeam');
    if (savedTeam) {
      teamSelectionDiv.style.display = 'none'; // Masquer la section de sélection
      const team = JSON.parse(savedTeam);
      teamInfo.textContent = `Votre équipe : ${team.name} (Fonds: ${team.funds} €)`;
    } else {
      teamSelectionDiv.style.display = 'block'; // Masquer la section de sélection
      teamInfo.textContent = 'Aucune équipe sélectionnée';
    }
  }

  // Charger la journée actuelle
  function loadDay() {
    const currentDay = localStorage.getItem('currentDay');
    currentDaySpan.textContent = currentDay;
  }

  // Charger les matchs du jour
  function loadMatches() {
    const currentDay = parseInt(localStorage.getItem('currentDay'));
    const matches = JSON.parse(localStorage.getItem('matches'));
    const teams = JSON.parse(localStorage.getItem('teams'));
    matchesList.innerHTML = ''; // Effacer la liste existante

    const todayMatches = matches.filter(match => match.day === currentDay);
    todayMatches.forEach(match => {
      const teamA = teams.find(team => team.id === match.teamA_id);
      const teamB = teams.find(team => team.id === match.teamB_id);
      const matchItem = document.createElement('li');
      matchItem.textContent = `${teamA.name} vs ${teamB.name} (Score: ${match.scoreA} - ${match.scoreB})`;
      matchesList.appendChild(matchItem);
    });
  }

  // Passer au jour suivant
  nextDayButton.addEventListener('click', () => {
    let currentDay = parseInt(localStorage.getItem('currentDay'));
    currentDay += 1;
    localStorage.setItem('currentDay', currentDay.toString());
    loadDay();
    loadMatches();
  });

  // Réinitialiser la progression
  resetButton.addEventListener('click', () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser votre progression ?')) {
      localStorage.clear();
      alert('Votre progression a été réinitialisée.');
      initGame();
      loadTeam();
      loadDay();
      loadMatches();
      loadTeams(); // Recharger les équipes
    }
  });

  // Initialiser le jeu si nécessaire
  initGame();
  loadTeam();
  loadDay();
  loadMatches();
  loadTeams(); // Charger les équipes à l'initialisation
});
