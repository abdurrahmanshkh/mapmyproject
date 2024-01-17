<script>
  import { AccordionItem, Accordion, Card, Hr, P } from 'flowbite-svelte';
  import { Tabs, TabItem } from 'flowbite-svelte';
  import { GridSolid, AdjustmentsVerticalSolid, ClipboardSolid } from 'flowbite-svelte-icons';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Progressbar } from 'flowbite-svelte';

  var projects= [
    {
        name: "Project 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo ..."
    },
    {
        name: "Project 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo ..."
    },
    {
        name: "Project 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo ..."
    },
    {
        name: "Project 4",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo ..."
    },
  ]

  var tasks = [ 
    {
      srNo: 1,
      taskName: "Task 1",
      contributors: "John Doe",
      progress: "In Progress"
    },
    {
      srNo: 2,
      taskName: "Task 2",
      contributors: "Jane Smith",
      progress: "Completed"
    },
    {
      srNo: 3,
      taskName: "Task 3",
      contributors: "Alex Johnson",
      progress: "In Progress"
    },
    {
      srNo: 4,
      taskName: "Task 4",
      contributors: "Sarah Williams",
      progress: "Not Started"
    },
  ]
</script>

<main>

  <div class="container py-10 mx-auto">
    <Card class="" size="" padding="xl">
      <div class="lg:grid lg:grid-cols-2">
      <h5 class="mb-0 text-3xl font-bold text-gray-900 dark:text-white">
        All Projects
      </h5>
      <h5 class="text-right mb-0 text-3xl font-bold text-gray-900 dark:text-white">
        User Name
      </h5>
      </div>
      <Hr classHr="my-4" />

      <Accordion>
        {#each projects as project}
        <div class="lg:grid lg:grid-cols-1 mb-5">
          <AccordionItem class="">
            <span slot="header">{project.name}</span>
            <Tabs style="underline">

              <TabItem open>
                <div slot="title" class="flex items-center gap-2">
                  <GridSolid size="sm" />
                  Dashboard
                </div>
                <p class="text-gray-900 dark:text-gray-100 mb-5">
                  <b>Overview:</b><br>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <Progressbar progress="75" labelOutside="Project Progress" />
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
                    </TableHead>
                    <TableBody class="">
                      {#each tasks as task}
                      <TableBodyRow>
                        <TableBodyCell>{task.srNo}</TableBodyCell>
                        <TableBodyCell>{task.taskName}</TableBodyCell>
                        <TableBodyCell>{task.contributors}</TableBodyCell>
                        <TableBodyCell>{task.progress}</TableBodyCell> 
                      </TableBodyRow>
                      {/each}
                    </TableBody>
                  </Table>
              </TabItem>
              
              <TabItem>
                <div slot="title" class="flex items-center gap-2">
                  <AdjustmentsVerticalSolid size="sm" />
                  Settings
                </div>

              </TabItem>
              
            </Tabs>
          </AccordionItem>
          </div>
        {/each}
      </Accordion>

    </Card>
  </div>
  
</main>