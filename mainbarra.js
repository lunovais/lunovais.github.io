const pollData = [
    {
      option: "C++",
      votes: 11,
      color: "rgb(255, 99, 132)"
    },
    {
      option: "C#",
      votes: 8,
      color: "rgb(153, 102, 255)"
    },
    {
      option: "Java",
      votes: 11,
      color: "rgb(36, 36, 36)"
    },
    {
      option: "Python",
      votes: 5,
      color: "rgb(255, 159, 64)"
    },
    {
      option: "Go",
      votes: 3,
      color: "rgb(75, 192, 192)"
    },
    {
      option: "JavaScript",
      votes: 8,
      color: "rgb(255, 206, 86)"
    },
    {
      option: "Outras",
      votes: 10,
      color: "rgb(54, 162, 235)"
    }
  ];
  
  const pollForm = document.querySelector("#pollForm");
  
  pollForm.addEventListener("submit", pollFormSubmit);
  
  function pollFormSubmit(event) {
    event.preventDefault();
    const pollOptionInput = pollForm.querySelector("input[name='pollOptions']:checked");
    if(pollOptionInput) {
      const pollOptionValue = pollOptionInput.value;
      pollData.find(pollOption => pollOption.option === pollOptionValue).votes++;
      pollChart.data.datasets[0].data = pollData.map(pollOption => pollOption.votes);
      pollChart.update();
      pollForm.reset();
    }
  }
  
  function rgbToRgba(rgb, alpha=1) {
    return `rgba(${rgb.substring(rgb.indexOf('(')+1, rgb.length-1).split(',').join()}, ${alpha})`;
  }
  
  Chart.defaults.global.defaultFontFamily = 'sans-serif';
  
  const ctx = document.getElementById('chart').getContext('2d');
  const pollChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: pollData.map(pollOption => pollOption.option),
      datasets: [{
        label: 'Número de Votos',
        data: pollData.map(pollOption => pollOption.votes),
        backgroundColor: pollData.map(pollOption => rgbToRgba(pollOption.color, 0.75)),
        borderWidth: 3
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      title: {
        display: true,
        text: 'Linguagens Favoritas',
        fontColor: "#333",
        fontSize: 20,
        padding: 20
      },
      legend: {
        display: false,
      }
    }
  });