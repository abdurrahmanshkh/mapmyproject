<script>
  import { AccordionItem, Accordion, Card, Hr, A } from 'flowbite-svelte';
  import { Input, Textarea, Button } from 'flowbite-svelte';
  import { Tabs, TabItem } from 'flowbite-svelte';
  import { GridSolid, AdjustmentsVerticalSolid, ClipboardSolid } from 'flowbite-svelte-icons';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Progressbar, Modal } from 'flowbite-svelte';
  import {onMount}from 'svelte'
  import {Calendar} from 'svelte-calendar'
  import { Spinner } from 'flowbite-svelte';
  import Flatpickr from 'flatpickr';
  import 'flatpickr/dist/flatpickr.min.css';
  import accounter from '../+page.svelte'
  let accountType=accounter
  console.log("type",accountType)
  // let projectData=[]
  $: taskData=[]
  let visibile=false
  let completedPercent=0
  let todo=0
  let done=0
  let profileName=''
  let taskstart = '';
  let taskdue = '';
  let createProject = false;
  let projectName = "";
  let projectDescription = "";
  let taskName = "";
  let assignedUsername = "";
  let taskDescription="";
  let taskDueDate="";
  let taskStartDate=""


  // onMount(async () => {
  //       try {
  //           const response = await fetch('http://localhost:8080/api/project/list',{
  //             method: 'GET',
  //             credentials: 'include'
  //           });
  //           const data = await response.json();
  //           projectData=data
  //       } catch (error) {
  //           console.error(error.message);
  //       }
      
  // });
  

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
            // projectData=data
            return data
 }
 async function fetchTasks(projectID) {
    const response = await fetch(`http://localhost:8080/api/project/${projectID}/task`, {
      method: 'GET',
      credentials: 'include', // Include credentials for session management
    });
    const tasks = await response.json();
    taskData=tasks
 }

 // Function to handle project click
 function handleProjectClick(projectID) {
    fetchTasks(projectID);
 }

 async function updateTask(taskID,status,projectID) {
    console.log("TASKID : ",taskID,"STATUS : ",status)
    const response = await fetch(`http://localhost:8080/api/task/${taskID}/update/status`, {
      method: 'POST',
      credentials: 'include', // Include credentials for session management
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
    console.log("data in progress:",data)
    completedPercent=data[0]
    done=data[1]
    todo=data[2]
    return data
 }

 async function getProfile(ID){
    const userID=ID
    const response=await fetch('http://localhost:8080/api/user/name',{
      method: 'POST',
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({userID})
    })
    const data=await response.json()
    console.log("Data : ",data[0].name,"userID ",userID)
    profileName=data[0].name
    return data[0].name
 }
 function getProfileClick(ID){
  const data=getProfile(ID)
  console.log(data)
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
 var tasks=[]

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

  let createTask = false;

  function createTaskOn() {
    createTask = true;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // This will format the date according to the user's locale
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
        {:then projectData} 
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