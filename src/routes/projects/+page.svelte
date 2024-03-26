<script>
  import { AccordionItem, Accordion, Card, Hr } from 'flowbite-svelte';
  import { Input, Textarea, Button } from 'flowbite-svelte';
  import { Tabs, TabItem } from 'flowbite-svelte';
  import { GridSolid, AdjustmentsVerticalSolid, ClipboardSolid } from 'flowbite-svelte-icons';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Progressbar, Modal } from 'flowbite-svelte';
  import {onMount}from 'svelte'
  import { Spinner } from 'flowbite-svelte';
  let projectData=[]
  let taskData=[]
  let completedPercent=0
  onMount(async () => {
        try {
            const response = await fetch('http://localhost:8080/api/project/list',{
              method: 'GET',
              credentials: 'include'
            });
            const data = await response.json();
            projectData=data
        } catch (error) {
            console.error(error.message);
        }
    });



 async function fetchTasks(projectID) {
    const response = await fetch(`http://localhost:8080/api/project/${projectID}/task`, {
      method: 'GET',
      credentials: 'include', // Include credentials for session management
    });
    const tasks = await response.json();
    taskData=tasks
    console.log(taskData); // Handle the tasks data as needed
 }

 // Function to handle project click
 function handleProjectClick(projectID) {
    fetchTasks(projectID);
 }

 async function updateTask(taskID,status) {
    const response = await fetch(`http://localhost:8080/api/task/${taskID}/update/status`, {
      method: 'POST',
      credentials: 'include', // Include credentials for session management
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({status})

    });
    const tasks = await response.json();
    taskData=tasks
    console.log(taskData); // Handle the tasks data as needed
 }
 function updateTaskClick(taskID,status) {
    updateTask(taskID,status);
 }

 async function getProgress(projectID){
    const response=await fetch(`http://localhost:8080/api/project/${projectID}/progress`,{
      method: 'GET',
      credentials:'include',
    })

    const data=await response.json()
    console.log(data,"project ",projectID)
    completedPercent=data
    return parseInt(data) 
 }

//DO NOT DELETE THIS VARIABLE
 var tasks=[]

  var createProject = false;
  var projectName = "";
  var projectDescription = "";
  var newTaskName = "";
  var newTaskContributors = "";

  function createProjectOn() {
    createProject = true;
  }

  function addProject() {
    if (projectName && projectDescription) {
      const newProjectId = projects.length + 1;
      projects = [...projects, { id: newProjectId, name: projectName, description: projectDescription }];
      projectName = "";
      projectDescription = "";
      createProject = false;
    }
  }

  function clearProject() {
    projectName = "";
    projectDescription = "";
    createProject = false;
  }

  function addTask(projectId) {
    const newTaskId = tasks.length + 1;
    tasks = [...tasks, {
      projectId: projectId,
      srNo: newTaskId,
      taskName: newTaskName,
      contributors: newTaskContributors,
      progress: "Not Started"
    }];
    newTaskName = "";
    newTaskContributors = "";
  }

  function deleteTask(taskId) {
    tasks = tasks.filter(task => task.srNo !== taskId);
  }

  let createTask = false;

  function createTaskOn() {
    createTask = true;
  }

  function clearTask() {
    newTaskName = "";
    newTaskContributors = "";
    createTask = false;
  }

  

  let popupModal = false;

  function closeModal() {
    popupModal = false;
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
                  <p class="text-gray-900 dark:text-gray-100 mb-5">
                    <b>Overview:</b><br>
                    {project.projectDescription}
                  </p>
                  {#await getProgress(project.projectID)}
                  <div>
                    <Button outline color="dark">
                      <Spinner class="me-3" size="4" />
                      Loading ...
                    </Button>
                  </div>
                  {:then data} 
                  <Progressbar progress={data} labelOutside="Project Progress" />
                  {/await}
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
                          <TableBodyCell>{task.taskDueDate}</TableBodyCell>
                          <TableBodyCell>
                            <select bind:value={task.status} on:change={()=> updateTaskClick(task.taskID,task.status)}>
                                <option>pending</option>
                                <option>completed</option>
                            </select>
                          </TableBodyCell>
                        </TableBodyRow>
                      {/each}
                    </TableBody>
                  </Table>

                  <Hr classHr="h-1"/>

                  {#if !createTask}
                  <div class="text-center">
                    <Button class="max-w-50 px-10" on:click={createTaskOn}>
                      Create New Task
                    </Button>
                  </div>
                  {:else}
                  <Card class="w-full max-w-full border-gray-300 dark:border-gray-700 border-2">

                  <h5 class="mb-6 col-span-4 text-3xl font-bold text-gray-900 dark:text-white text-center">
                    Create New Task
                  </h5>

                  <div class="gap-6 lg:grid grid-cols-9 mb-6">
                    <Input class="col-span-4" type="text" placeholder="Task Name" bind:value={newTaskName} />
                    <Input class="col-span-4" type="text" placeholder="Contributors" bind:value={newTaskContributors} />
                    <Button class="" color="red" on:click={clearTask}>
                      Clear
                    </Button>
                  </div>

                  <div class="text-center">
                  <Button class="w-40" color="green" on:click={() => addTask(project.id)}>
                    Add Task
                  </Button>
                  </div>
                  
                  </Card>
                  {/if}
                  
                </TabItem>

              </Tabs>
            </AccordionItem>
          </div>
        {/each}
      </Accordion>

      <Hr classHr="mt-3 h-1" />
      
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
            <Button color="green" class="max-w-30" on:click={addProject}>
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

    </Card>
  </div>

</main>