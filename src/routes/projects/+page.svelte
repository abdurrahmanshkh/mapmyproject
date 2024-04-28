<script>
  import { AccordionItem, Accordion, Card, Hr, A } from 'flowbite-svelte';
  import { Input, Textarea, Button } from 'flowbite-svelte';
  import { Tabs, TabItem } from 'flowbite-svelte';
  import { GridSolid, AdjustmentsVerticalSolid, ClipboardSolid } from 'flowbite-svelte-icons';
  import {ChartMixedSolid} from 'flowbite-svelte-icons'
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Progressbar, Modal } from 'flowbite-svelte';
  import {onMount}from 'svelte'
  import {Calendar} from 'svelte-calendar'
  import { Spinner } from 'flowbite-svelte';
  import Flatpickr from 'flatpickr';
  import 'flatpickr/dist/flatpickr.min.css';
  import accounter from '../+page.svelte'
  import Chart from 'chart.js/auto';


  let accountType=accounter
  console.log("type",accountType)
  $: projectData=[]
  $: taskData=[]
  let visibile=false
  let completedPercent=0
  let todo=0
  let done=0
  let profileName=''
  let createProject = false;
  let projectName = "";
  let projectDescription = "";
  let taskName = "";
  let assignedUsername = "";
  let taskDescription="";
  let taskDueDate="";
  let taskStartDate=""

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


    async function fetchPERTDATA(id){
      const response = await fetch(`http://localhost:8080/api/project/${id}/pert/data`,{
        method:'GET',
        credentials: 'include',

        headers:{
          'Content-Type':'application/json'
        }
      })
      const data=await response.json()
      console.log(optimisticTimes,pessimisticTimes,mostLikelyTimes)
      optimisticTimes=data.optimistic
      pessimisticTimes=data.pessimistic
      mostLikelyTimes=data.likely
      await calculatePERT()
      renderTasksChart()
      renderOverallChart()
    }

    async function calculatePERT() {
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
      await calculatePERT();
      
      // Render chart for individual tasks
      renderTasksChart();
      console.log("Render chart")
      // Render chart for overall probability
      renderOverallChart();
    }
    
    function renderTasksChart() {
      const ctxTasks = document.getElementById('tasksChart');
      chartTasks = new Chart(ctxTasks, {
        type: 'line',
        data: {
          labels: [], 
          datasets: mean_arr.map((mean, index) => ({
            label: `Task ${index + 1}`,
            data: [], 
            fill: true,
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
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)', 
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
  

  function clearTask() {
   projectName = "";
   projectDescription = "";
   taskName = "";
   assignedUsername = "";
   taskDescription="";
   taskDueDate="";
   taskStartDate=""

    createTask = false;
  }

 async function fetchProjects(){
  const response = await fetch('http://localhost:8080/api/project/list',{
              method: 'GET',
              credentials: 'include'
            });
            const data = await response.json();
            projectData=data
 }
 async function fetchTasks(projectID) {
    const response = await fetch(`http://localhost:8080/api/project/${projectID}/task`, {
      method: 'GET',
      credentials: 'include', 
    });
    const tasks = await response.json();
    taskData=tasks
    await fetchPERTDATA(projectID)
    console.log("taskData : ",taskData.pessimisticTimes)
 }

 function handleProjectClick(projectID) {
    fetchTasks(projectID);
 }

 async function updateTask(taskID,status,projectID) {
    console.log("TASKID : ",taskID,"STATUS : ",status)
    const response = await fetch(`http://localhost:8080/api/task/${taskID}/update/status`, {
      method: 'POST',
      credentials: 'include', 
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({status})

    });
    fetchTasks(projectID)
 }

 async function getProgress(projectID){
    const response=await fetch(`http://localhost:8080/api/project/${projectID}/progress`,{
      method: 'GET',
      credentials:'include',
    })

    const data=await response.json()
    completedPercent=data[0]
    done=data[1]
    todo=data[2]
    return data
 }



 async function createNewTask(projectID){
  const response=await fetch(`http://localhost:8080/api/project/${projectID}/task/create`,{
      method: 'POST',
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        taskName,
        taskDescription,
        taskDueDate,
        taskStartDate,
        assignedUsername
      })
    })
    if (response.ok) {
      fetchTasks(projectID) 
      fetchProjects()
      clearTask()   
  } 
 }

 async function createNewProject(){
  const response=await fetch(`http://localhost:8080/api/project/create`,{
      method: 'POST',
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        projectName,
        projectDescription
      })
    })
    fetchProjects()
 }
//DO NOT DELETE THIS VARIABLE
//  var tasks=[]

  function createProjectOn() {
    createProject = true;
  }

  function clearProject() {
    projectName = "";
    projectDescription = "";
    createProject = false;
  }

  let createTask = false;

  function createTaskOn() {
    createTask = true;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // This will format the date according to the user's locale
 }


 function PERT() {
    // Select all input elements in the table
    const inputs = document.querySelectorAll('input[type="text"]');

    // Iterate over each input element
    inputs.forEach((input, index) => {
      const value = parseFloat(input.value);
      if (!isNaN(value)) {
        // Determine the column and push the value to the corresponding array
        if (index % 3 === 0) {
          optimisticTimes.push(value);
        } else if (index % 3 === 1) {
          pessimisticTimes.push(value);
        } else {
          mostLikelyTimes.push(value);
        }
      }
    });
    pert()
    console.log('Optimistic Times:', optimisticTimes);
    console.log('Pessimistic Times:', pessimisticTimes);
    console.log('Most Likely Times:', mostLikelyTimes);
  }

</script>

<main>
  <div class="container py-10 mx-auto">
    <Card class="border-gray-300 dark:border-gray-700 border-2" size="" padding="xl">
      <div class="lg:grid lg:grid-cols-1">
        <h5 class="mb-0 text-3xl font-bold text-gray-900 dark:text-white text-center">
          All Projects
        </h5>
      </div>
      <Hr classHr="my-4 h-1" />

      <Accordion>
        {#await fetchProjects()}
        <div>
        <Button outline color="yellow">
          <Spinner class="me-11" size="5"color="yellow" />
          Loading ...
        </Button>
      </div>
        {:then data} 
        {#if projectData!=null && projectData!=undefined}
          {#each projectData as project}
            <div class="lg:grid lg:grid-cols-1 mb-5">
              <AccordionItem class="border-gray-300 dark:border-gray-700">
                <span slot="header">{project.projectName}</span>
                <Tabs style="underline">
          
                  <TabItem open>
                    <div slot="title" class="flex items-center gap-2">
                      <GridSolid size="sm" />
                      Dashboard
                    </div> 
                    <div>                   
                      <p class="text-gray-900 dark:text-gray-100 mb-5">
                        <b>Overview:</b><br>
                        {project.projectDescription}
                      </p>
                      {#await getProgress(project.projectID)}
                        <Spinner/>
                      {:then data}
                      {#if !data[0]} 
                        <Progressbar progress={0} labelOutside="Project Progress" />
                      {:else}
                        <Progressbar progress={parseFloat(data[0].toFixed(2))} labelOutside="Project Progress" />
                        <br>
                        <div class="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                          <div class="mb-2">
                            <div class="grid grid-cols-3 gap-3">
                              <dl class="flex h-[78px] flex-col items-center justify-center rounded-lg bg-red-100 dark:bg-gray-600">
                                <dt class="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-sm font-medium text-red-600 dark:bg-gray-500 dark:text-red-300">
                                  {data[2]}
                                </dt>
                                <dd class="text-sm font-medium text-red-600 dark:text-red-300">To do</dd>
                              </dl>
      
                              <dl class="flex h-[78px] flex-col items-center justify-center rounded-lg bg-green-100 dark:bg-gray-600">
                                <dt class="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-medium text-blue-600 dark:bg-gray-500 dark:text-green-400">
                                  {data[1]}
                                </dt>
                                <dd class="text-sm font-medium text-green-600 dark:text-green-400">Done</dd>
                              </dl>

                              <dl class="flex h-[78px] flex-col items-center justify-center rounded-lg bg-blue-100 dark:bg-gray-600">
                                <dt class="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600 dark:bg-gray-500 dark:text-blue-300">
                                  {data[1]+data[2]}
                                </dt>
                                <dd class="text-sm font-medium text-blue-600 dark:text-blue-300">Total</dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                      {/if}
                      {/await}
                      </div>
                      
    
                  </TabItem>

                  <TabItem on:click={()=>handleProjectClick(project.projectID)}>
                    <div slot="title" class="flex items-center gap-2">
                      <ClipboardSolid size="sm" />
                      Tasks
                    </div>
                    <Table>
                      <TableHead>
                        <TableHeadCell>Name</TableHeadCell>
                        <TableHeadCell>Description</TableHeadCell>
                        <TableHeadCell>Due Date</TableHeadCell>
                        <TableHeadCell>Status</TableHeadCell>
                      </TableHead>
                      <TableBody class="">
                        {#each taskData as task }
                          <TableBodyRow>
                            <TableBodyCell>{task.taskName}</TableBodyCell>
                            <TableBodyCell>{task.taskDescription}</TableBodyCell>
                            {#if task.taskDueDate!=null}
                            <TableBodyCell>{formatDate(task.taskDueDate)}</TableBodyCell>
                            {:else}
                            <TableBodyCell>none</TableBodyCell>
                            {/if}
                            <TableBodyCell>
                              <input type="checkbox" checked={task.taskStatus === 'completed'} on:change={()=>updateTask(task.taskID,task.taskStatus==='completed'?'pending':'completed',project.projectID)} />
                            </TableBodyCell>
                          </TableBodyRow>
                        {/each}
                      </TableBody>
                    </Table>

                    <Hr classHr="h-1"/>

                    {#if !createTask}
                    <div class="text-center">
                      <Button class="max-w-100 px-20" on:click={createTaskOn}>
                        Create New Task
                      </Button>
                    </div>
                    {:else}
                    <Card class="w-full max-w-full border-gray-300 dark:border-gray-700 border-2">

                    <h5 class="mb-6 col-span-4 text-3xl font-bold text-gray-900 dark:text-white text-center">
                      Create New Task
                    </h5>

                    <div class="gap-6 lg:grid grid-cols-9 mb-6">
                      <Input class="col-span-4" type="text" placeholder="Task Name" bind:value={taskName} />
                      <Input class="col-span-4" type="text" placeholder="Contributors" bind:value={assignedUsername} />
                      <Input class="col-span-4" type="text" placeholder="Description" bind:value={taskDescription} />
                      <Input class="col-span-4" type="text" placeholder="Due Date" bind:value={taskDueDate} />
                      <Input class="col-span-4" type="text" placeholder="Start Date" bind:value={taskStartDate} />
                    </div>
                
                    <div class="text-center">
                      <Button class="w-40" color="green" on:click={()=>createNewTask(project.projectID)}>Add Task</Button>
                    </div>

                    
                    </Card>
                    {/if}
                    
                  </TabItem>
                  <TabItem on:click={()=>fetchTasks(project.projectID)}>
                    <div slot="title" class="flex items-center gap-2">
                      <ChartMixedSolid size="sm" />
                      PERT
                    </div>
                    <Table>
                      <TableHead>
                        <TableHeadCell>Tasks</TableHeadCell>
                        <TableHeadCell>Optimistic Time</TableHeadCell>
                        <TableHeadCell>Pessimistic Time</TableHeadCell>
                        <TableHeadCell>Most Likely Time</TableHeadCell>
                      </TableHead>
                      <TableBody>
                        {#each taskData as task}
                        <TableBodyRow>
                          <TableBodyCell>{task.taskName}</TableBodyCell>
                          <TableBodyCell>
                            <Input type="text" class="flex h-[40px] w-[150px] flex-col items-center justify-center bg-green-200" color="green" />
                          </TableBodyCell>
                          <TableBodyCell>
                            <Input type="text" class="flex h-[40px] w-[150px] flex-col items-center justify-center bg-red-200" color="red"/>
                          </TableBodyCell>
                          <TableBodyCell>
                            <Input type="text" class="flex h-[40px] w-[150px] flex-col items-center justify-center bg-blue-200" color="blue" />
                          </TableBodyCell>
                        </TableBodyRow>
                        {/each}
                      </TableBody>
                    </Table>

                    <br>
                    <div>
                    <Button class="flex justify-center" >Calculate PERT</Button>
                    </div>
                    <div>
                      <canvas id='tasksChart' style="width:100px; height:30px"></canvas>
                    </div>
                    <div>
                      <canvas id='overallChart' style="width:100px; height:30px"></canvas>
                    </div>
                  </TabItem>
                </Tabs>
              </AccordionItem>
          </div>
        {/each}
        {:else}
        <p>no projects</p>
      {/if}
      {/await}
      </Accordion>

      <Hr classHr="mt-3 h-1" />
      {#if accountType!=0}
      {#if !createProject}
      <div class="mt- gap-4 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-1">
        <Button class="" on:click={createProjectOn}>
          Create New Project
        </Button>
      </div>
      {:else}

      <div>
      <Card class="max-w-full border-gray-300 dark:border-gray-700 border-2">
        <h5 class="mb-6 text-3xl font-bold text-gray-900 dark:text-white text-center">
          Create New Project
        </h5>
        <div class="lg:grid lg:grid-cols-1">
          <Input type="text" id="projectName" placeholder="Project Name" required class="mb-5"
          bind:value={projectName} />
          <Textarea type="text" id="projectDescription" placeholder="Project Description" required class="mb-5" rows="6"
          bind:value={projectDescription} />
          
          <div class="mt- gap-4 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2">
            <Button color="green" class="max-w-30" on:click={createNewProject}>
              Add Project
            </Button>
             <Button color="red" class="" on:click={clearProject}>
              Clear
            </Button>
          </div>
        </div>
      </Card>
      </div>
      {/if}
      {/if}
    </Card>
  </div>


</main> 