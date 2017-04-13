



function displayChart(twitterScores,facebookScores) {
    var ctx = document.getElementById("myChart").getContext("2d");

    if (ctx == null) {
        consosle.log("Ctx is null")
    }

    ctx.width = 400;
    ctx.height = 400;
    var data = {
        labels: ["Positive", "Negative"],
        datasets: [{

            backgroundColor: [
                'rgba(0,255,0,0.7)',
                'rgba(255,0,0,0.7)'
            ],
            borderColor: [
                'rgba(0,255,0, 0.7)',
                'rgba(255,0,0,0.7)'
            ],
            borderWidth: 1,
            data: twitterScores

        },
          


        ]

    };

    var barOptions = {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Analysis",
                fontSize: 14
            },
            scales: {
                xAxes: [{
                    stacked: false
                }],
                yAxes: [{
                    stacked: false,
                    ticks: {
                        beginAtZero:true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Percentage"

                    }

                }]


            }
        };

    var barChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: barOptions
    });
}




