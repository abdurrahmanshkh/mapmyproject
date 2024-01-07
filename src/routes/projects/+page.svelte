<script>
    import { AccordionItem, Accordion, Card, Hr, P } from 'flowbite-svelte';
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
        {
            name: "Project 5",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo ..."
        },
        {
            name: "Project 6",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo ..."
        },
        {
            name: "Project 7",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo ..."
        },
        {
            name: "Project 8",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo ..."
        },
        {
            name: "Project 9",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo ..."
        },
    ]
</script>

<main>

  <div class="container py-10 mx-auto items-center">
    <Card class="text-center" size="" padding="xl">
      <h5 class="mb-0 text-3xl font-bold text-gray-900 dark:text-white">
        All Projects
      </h5>
      <Hr classHr="my-4" />

      <Accordion>
        {#each projects as project}
        <div class="lg:grid lg:grid-cols-1 mb-5">
          <AccordionItem class="rounded-lg border-blue-900">
            <span slot="header">{project.name}</span>
            <p class="mb-2 text-gray-500 dark:text-gray-400">{project.description}</p>
            <p class="text-gray-500 dark:text-gray-400">
              Check out this guide to learn how to <a href="/" target="_blank" rel="noreferrer" class="text-blue-600 dark:text-blue-500 hover:underline"> get started </a>
              and start developing websites even faster with components on top of Tailwind CSS.
            </p>
          </AccordionItem>
          </div>
        {/each}
      </Accordion>

    </Card>
  </div>
  
</main>