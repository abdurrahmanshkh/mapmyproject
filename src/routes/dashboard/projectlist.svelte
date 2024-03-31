<script>
	import { AccordionItem, Accordion, Card, Hr } from 'flowbite-svelte';
	import { Input, Textarea, Button } from 'flowbite-svelte';
	import { Progressbar } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';

	var projects = [
		{
			id: 1,
			name: 'Project 1',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo ...'
		},
		{
			id: 2,
			name: 'Project 2',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo ...'
		},
		{
			id: 3,
			name: 'Project 3',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo ...'
		},
		{
			id: 4,
			name: 'Project 4',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo ...'
		}
	];

	var tasks = [
		{
			projectId: 1,
			srNo: 1,
			taskName: 'Task 1',
			contributors: 'Suyash Saraf',
			progress: 'In Progress'
		},
		{
			projectId: 1,
			srNo: 2,
			taskName: 'Task 2',
			contributors: 'Abdur Rehman',
			progress: 'Completed'
		},
		{
			projectId: 1,
			srNo: 3,
			taskName: 'Task 3',
			contributors: 'Ritika Jain',
			progress: 'In Progress'
		},
		{
			projectId: 1,
			srNo: 4,
			taskName: 'Task 4',
			contributors: 'Shree Ganesh',
			progress: 'Not Started'
		}
	];

	var createProject = false;
	var projectName = '';
	var projectDescription = '';

	function createProjectOn() {
		createProject = true;
	}

	function addProject() {
		if (projectName && projectDescription) {
			const newProjectId = projects.length + 1;
			projects = [
				...projects,
				{ id: newProjectId, name: projectName, description: projectDescription }
			];
			projectName = '';
			projectDescription = '';
			createProject = false;
		}
	}

	function clearProject() {
		projectName = '';
		projectDescription = '';
		createProject = false;
	}

	function calculateProjectCompletionStatus(projectId) {
		const projectTasks = tasks.filter((t) => t.projectId === projectId);
		const completedTasks = projectTasks.filter((t) => t.progress === 'Completed').length;
		const totalTasks = projectTasks.length;

		return totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
	}
</script>

<Card class="w-full max-w-full border-2 border-gray-300 dark:border-gray-700" size="" padding="xl">
	<div class="lg:grid lg:grid-cols-1">
		<h5 class="mb-0 text-center text-3xl font-bold text-gray-900 dark:text-white">All Projects</h5>
	</div>
	<Hr classHr="my-4 h-1" />

	<Accordion>
		{#each projects as project}
			<div class="mb-5 lg:grid lg:grid-cols-1">
				<AccordionItem class="border-gray-300 dark:border-gray-700">
					<span slot="header">{project.name}</span>
					<p class="mb-5 text-gray-900 dark:text-gray-100">
						<b>Overview</b><br />
						{project.description}
					</p>
					<Progressbar
						class="mb-6"
						progress={calculateProjectCompletionStatus(project.id)}
						labelOutside="Project Progress"
					/>
					<div class="text-center">
						<Button color="purple">
							Go to Project Page <ArrowRightOutline class="ms-2 h-3.5 w-3.5" />
						</Button>
					</div>
				</AccordionItem>
			</div>
		{/each}
	</Accordion>

	<Hr classHr="mt-3 h-1" />

	{#if !createProject}
		<div class="mt- mx-auto max-w-screen-xl items-center gap-4 lg:grid lg:grid-cols-1">
			<Button class="" on:click={createProjectOn}>Create New Project</Button>
		</div>
	{:else}
		<div>
			<Card class="max-w-full border-2 border-gray-300 dark:border-gray-700">
				<h5 class="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
					Create New Project
				</h5>
				<div class="lg:grid lg:grid-cols-1">
					<Input
						type="text"
						id="projectName"
						placeholder="Project Name"
						required
						class="mb-5"
						bind:value={projectName}
					/>
					<Textarea
						type="text"
						id="projectDescription"
						placeholder="Project Description"
						required
						class="mb-5"
						rows="6"
						bind:value={projectDescription}
					/>

					<div class="mt- mx-auto max-w-screen-xl items-center gap-4 lg:grid lg:grid-cols-2">
						<Button color="green" class="max-w-30" on:click={addProject}>Add Project</Button>
						<Button color="red" class="" on:click={clearProject}>Clear</Button>
					</div>
				</div>
			</Card>
		</div>
	{/if}
</Card>
