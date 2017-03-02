



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
                'rgba(29,161,242,0.7)',
                'rgba(29,161,242)'
            ],
            borderColor: [
                'rgba(29,161,242, 0.7)',
                'rgba(29,161,242,0.7)'
            ],
            borderWidth: 1,
            data: twitterScores

        },
            {
                backgroundColor: [
                'rgba(59,89,152,0.7)',
                'rgba(59,89,152, 0.7)'
            ],
            borderColor: [
                'rgba(59,89,152, 0.7)',
                'rgba(59,89,152, 0.7)'
            ],
            borderWidth: 1,
            data: [twitterScores[0]-0.2,twitterScores[1]+0.2]
            }


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




