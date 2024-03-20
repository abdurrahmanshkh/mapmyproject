<script>
  import { AccordionItem, Accordion, Card, Hr } from 'flowbite-svelte';
  import { Input, Textarea, Button } from 'flowbite-svelte';
  import { Tabs, TabItem } from 'flowbite-svelte';
  import { GridSolid, AdjustmentsVerticalSolid, ClipboardSolid } from 'flowbite-svelte-icons';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Progressbar, Modal } from 'flowbite-svelte';
  import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
  import {onMount}from 'svelte'
  let projectData=[]
  onMount(async () => {
        try {
            const response = await fetch('http://localhost:8080/api/mark/project/list');
            if (!response.ok) {
                throw new Error('Failed to retrieve projects');
            }
            const data = await response.json();
            console.log("data : ",data)
            // Update the projects store with the retrieved list of projects
            projectData.set(data);
        } catch (error) {
            console.error(error.message);
        }
    });
  var projects = [
    {
      id: 1,
      name: "Project 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo ..."
    },
    {
      id: 2,
      name: "Project 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo ..."
    },
    {
      id: 3,
      name: "Project 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo ..."
    },
    {
      id: 4,
      name: "Project 4",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo ..."
    },
  ];

  var tasks = [
    {
      projectId: 1,
      srNo: 1,
      taskName: "Task 1",
      contributors: "Suyash Saraf",
      progress: "In Progress"
    },
    {
      projectId: 1,
      srNo: 2,
      taskName: "Task 2",
      contributors: "Abdur Rehman",
      progress: "Completed"
    },
    {
      projectId: 1,
      srNo: 3,
      taskName: "Task 3",
      contributors: "Ritika Jain",
      progress: "In Progress"
    },
    {
      projectId: 1,
      srNo: 4,
      taskName: "Task 4",
      contributors: "Shree Ganesh",
      progress: "Not Started"
    },
  ];

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

  function calculateProjectCompletionStatus(projectId) {
    const projectTasks = tasks.filter(t => t.projectId === projectId);
    const completedTasks = projectTasks.filter(t => t.progress === "Completed").length;
    const totalTasks = projectTasks.length;

    return totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  }

  let popupModal = false;

  function closeModal() {
    popupModal = false;
  }

</script>

<main>
  <div>
    <ul>
      {#each projectData as project}
         <li>{project.projectName}</li>
      {/each}
     </ul>
  </div>
  <div class="container py-10 mx-auto">
    <Card class="border-gray-300 dark:border-gray-700 border-2" size="" padding="xl">
      <div class="lg:grid lg:grid-cols-1">
        <h5 class="mb-0 text-3xl font-bold text-gray-900 dark:text-white text-center">
          All Projects
        </h5>
      </div>
      <Hr classHr="my-4 h-1" />

      <Accordion>
        {#each projects as project}
          <div class="lg:grid lg:grid-cols-1 mb-5">
            <AccordionItem class="border-gray-300 dark:border-gray-700">
              <span slot="header">{project.name}</span>
              <Tabs style="underline">

                <TabItem open>
                  <div slot="title" class="flex items-center gap-2">
                    <GridSolid size="sm" />
                    Dashboard
                  </div>
                  <p class="text-gray-900 dark:text-gray-100 mb-5">
                    <b>Overview:</b><br>
                    {project.description}
                  </p>
                  <Progressbar progress={calculateProjectCompletionStatus(project.id)} labelOutside="Project Progress" />
                </TabItem>

                <TabItem>
                  <div slot="title" class="flex items-center gap-2">
                    <ClipboardSolid size="sm" />
                    Tasks
                  </div>
                  <Table>
                    <TableHead>
                      <TableHeadCell>Sr. No.</TableHeadCell>
                      <TableHeadCell>Task Name</TableHeadCell>
                      <TableHeadCell>Contributors</TableHeadCell>
                      <TableHeadCell>Progress</TableHeadCell>
                      <TableHeadCell>Action</TableHeadCell>
                    </TableHead>
                    <TableBody class="">
                      {#each tasks.filter(t => t.projectId === project.id) as task}
                        <TableBodyRow>
                          <TableBodyCell>{task.srNo}</TableBodyCell>
                          <TableBodyCell>{task.taskName}</TableBodyCell>
                          <TableBodyCell>{task.contributors}</TableBodyCell>
                          <TableBodyCell>{task.progress}</TableBodyCell>
                          <TableBodyCell>
                            <Button color="red" on:click={() => (popupModal = true)}>Delete</Button>

                                <Modal bind:open={popupModal} size="xs" autoclose>
                                <div class="text-center">
                                    <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
                                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this Task?</h3>
                                    <Button color="red" class="me-2" on:click={() => deleteTask(task.srNo)} on:click={closeModal}>
                                      Yes, I'm sure
                                    </Button>
                                    <Button color="alternative">No, cancel</Button>
                                </div>
                                </Modal>

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