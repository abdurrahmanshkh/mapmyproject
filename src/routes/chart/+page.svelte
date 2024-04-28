<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    
    let chartTasks;
    let chartOverall;
    let variance_arr;
    let mean_arr;
    let total_mean;
    let total_var;
    let optimisticTimes = [10, 14, 10, 11, 14];
    let pessimisticTimes = [14, 26, 17, 19, 24];
    let mostLikelyTimes = [12, 13, 15, 14, 20];
    let taskColors = ['blue', 'red', 'green', 'orange', 'purple']; // Define colors for each task
    const transparentColors = [
    'rgba(0, 0, 255, 0.5)',    // Blue
    'rgba(255, 0, 0, 0.5)',    // Red
    'rgba(0, 128, 0, 0.5)',    // Green
    'rgba(255, 165, 0, 0.5)',  // Orange
    'rgba(128, 0, 128, 0.5)'   // Purple
];
    async function pert() {
      const response = await fetch(`http://localhost:5000/api/pert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          optimisticTimes,
          pessimisticTimes,
          mostLikelyTimes
        })
      });
      const data = await response.json();
      mean_arr = data.mean;
      variance_arr = data.var;
      total_mean=data.total_mean;
      total_var=data.total_var;
      console.log(data);
    }
  
    async function fetchDataAndRenderChart() {
      await pert();
      
      // Render chart for individual tasks
      renderTasksChart();
      
      // Render chart for overall probability
      renderOverallChart();
    }
    
    function renderTasksChart() {
      const ctxTasks = document.getElementById('tasksChart');
      chartTasks = new Chart(ctxTasks, {
        type: 'line',
        data: {
          labels: [], // Fill this with your x-axis labels
          datasets: mean_arr.map((mean, index) => ({
            label: `Task ${index + 1}`,
            data: [], // Fill this with your y-axis data
            fill: true,
            backgroundColor:transparentColors[index],
            borderColor: taskColors[index], // Assign color based on index
            tension: 0.1
          }))
        },
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom'
            },
            y: {
              title: {
                display: true,
                text: 'Probability'
              }
            }
          }
        }
      });
      
      generateNormalDistributionTasks();
    }
    
    function renderOverallChart() {
      const ctxOverall = document.getElementById('overallChart');
      chartOverall = new Chart(ctxOverall, {
        type: 'line',
        data: {
          labels: [], // Fill this with your x-axis labels
          datasets: [{
            label: 'Overall Probability',
            data: [], // Fill this with your y-axis data
            fill: false,
            borderColor: 'blue',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom'
            },
            y: {
              title: {
                display: true,
                text: 'Probability'
              }
            }
          }
        }
      });
      
      generateNormalDistributionOverall();
    }
  
    function generateNormalDistributionTasks() {
      let normalData = [];
      for (let i = 0; i < mean_arr.length; i++) {
        let mean = mean_arr[i];
        let variance = variance_arr[i];
        let dataPoints = [];
        for (let x = mean - 3 * Math.sqrt(variance); x <= mean + 3 * Math.sqrt(variance); x += 0.1) {
          let y = (1 / Math.sqrt(2 * Math.PI * variance)) * Math.exp(-0.5 * ((x - mean) ** 2) / variance);
          dataPoints.push({ x, y });
        }
        normalData.push(dataPoints);
      }
      
      // Update each dataset with its corresponding data points
      normalData.forEach((dataPoints, index) => {
        chartTasks.data.datasets[index].data = dataPoints;
      });
      
      chartTasks.update();
    }
    
    function generateNormalDistributionOverall() {
      let overallData = [];
      let totalMean = total_mean;
      let totalVariance = total_var;

      for (let x = totalMean - 3 * Math.sqrt(totalVariance); x <= totalMean + 3 * Math.sqrt(totalVariance); x += 0.1) {
        let y = gaussianPDF(x, totalMean, Math.sqrt(totalVariance));
        overallData.push({ x, y });
      }

      chartOverall.data.datasets[0].data = overallData;
      chartOverall.update();
    }
    
    function gaussianPDF(x, mean, stdDev) {
      return Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2))) / (stdDev * Math.sqrt(2 * Math.PI));
    }
  
    onMount(fetchDataAndRenderChart);
</script>
<div>
    <canvas id='tasksChart' style="width:100px; height: 30px;"></canvas>
</div>
<div>
    <canvas id='overallChart' style="width: 100px; height: 30px;"></canvas>
</div>
