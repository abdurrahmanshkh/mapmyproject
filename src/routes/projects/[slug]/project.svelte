<script>
	import Graph from './graph.svelte';
	import { Button, Input, Card, Hr } from 'flowbite-svelte';
	import { Tabs, TabItem } from 'flowbite-svelte';
	import { GridSolid, ClipboardSolid } from 'flowbite-svelte-icons';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Progressbar,
		Modal
	} from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';

	var project = {
		id: 1,
		name: 'Project 1',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo.'
	};

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

	var newTaskName = '';
	var newTaskContributors = '';

	function addTask(projectId) {
		const newTaskId = tasks.length + 1;
		tasks = [
			...tasks,
			{
				projectId: projectId,
				srNo: newTaskId,
				taskName: newTaskName,
				contributors: newTaskContributors,
				progress: 'Not Started'
			}
		];
		newTaskName = '';
		newTaskContributors = '';
	}

	function deleteTask(taskId) {
		tasks = tasks.filter((task) => task.srNo !== taskId);
	}

	let createTask = false;

	function createTaskOn() {
		createTask = true;
	}

	function clearTask() {
		newTaskName = '';
		newTaskContributors = '';
		createTask = false;
	}

	function calculateProjectCompletionStatus(projectId) {
		const projectTasks = tasks.filter((t) => t.projectId === projectId);
		const completedTasks = projectTasks.filter((t) => t.progress === 'Completed').length;
		const totalTasks = projectTasks.length;

		return totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
	}

	let popupModal = false;

	function closeModal() {
		popupModal = false;
	}

	function downloadProjectAsPDF() {
		const projectData = JSON.stringify({ project, tasks }, null, 2);
		const blob = new Blob([projectData], { type: 'application/pdf' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'project_report.pdf';
		document.body.appendChild(a);
		a.click();
		window.URL.revokeObjectURL(url);
	}

	function downloadProjectAsText() {
		const projectData = JSON.stringify({ project, tasks }, null, 2);
		const blob = new Blob([projectData], { type: 'text/plain' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'project_report.txt';
		document.body.appendChild(a);
		a.click();
		window.URL.revokeObjectURL(url);
	}
</script>

<div class="container mx-auto py-10">
	<Card class="border-2 border-gray-300 dark:border-gray-700" size="" padding="xl">
		<div class="lg:grid lg:grid-cols-1">
			<h5 class="mb-0 text-center text-3xl font-bold text-gray-900 dark:text-white">
				{project.name}
			</h5>
		</div>

		<Hr classHr="my-4 h-1" />

		<Tabs style="underline">
			<TabItem open>
				<div slot="title" class="flex items-center gap-2">
					<GridSolid size="sm" />
					Dashboard
				</div>
				<div class="container mx-auto grid-cols-5 gap-5 lg:grid">
					<div class="col-span-2 space-y-5">
						<Card class="border-2 border-gray-300 dark:border-gray-700" size="" padding="xl">
							<p class="mb-5 text-gray-900 dark:text-gray-100">
								<b>Overview</b><br />
								{project.description}
							</p>
							<Progressbar
								progress={calculateProjectCompletionStatus(project.id)}
								labelOutside="Project Progress"
							/>
						</Card>
						<Card
							class="space-y-5 border-2 border-gray-300 dark:border-gray-700"
							size=""
							padding="xl"
						>
							<h5 class="mb-2 text-center text-xl font-bold text-gray-900 dark:text-white">
								Download Project Report
							</h5>
							<Button class="w-full" color="red" on:click={downloadProjectAsPDF}>Download as PDF File</Button>
            				<Button class="w-full" color="green" on:click={downloadProjectAsText}>Download as Text File</Button>
						</Card>
					</div>
					<div class="col-span-3">
						<Graph />
					</div>
				</div>
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
						{#each tasks.filter((t) => t.projectId === project.id) as task}
							<TableBodyRow>
								<TableBodyCell>{task.srNo}</TableBodyCell>
								<TableBodyCell>{task.taskName}</TableBodyCell>
								<TableBodyCell>{task.contributors}</TableBodyCell>
								<TableBodyCell>{task.progress}</TableBodyCell>
								<TableBodyCell>
									<Button color="red" on:click={() => (popupModal = true)}>Delete</Button>

									<Modal bind:open={popupModal} size="xs" autoclose>
										<div class="text-center">
											<ExclamationCircleOutline
												class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200"
											/>
											<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
												Are you sure you want to delete this Task?
											</h3>
											<Button
												color="red"
												class="me-2"
												on:click={() => deleteTask(task.srNo)}
												on:click={closeModal}
											>
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

				<Hr classHr="h-1" />

				{#if !createTask}
					<div class="text-center">
						<Button class="max-w-50 px-10" on:click={createTaskOn}>Create New Task</Button>
					</div>
				{:else}
					<Card class="w-full max-w-full border-2 border-gray-300 dark:border-gray-700">
						<h5
							class="col-span-4 mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white"
						>
							Create New Task
						</h5>

						<div class="mb-6 grid-cols-9 gap-6 lg:grid">
							<Input
								class="col-span-4"
								type="text"
								placeholder="Task Name"
								bind:value={newTaskName}
							/>
							<Input
								class="col-span-4"
								type="text"
								placeholder="Contributors"
								bind:value={newTaskContributors}
							/>
							<Button class="" color="red" on:click={clearTask}>Clear</Button>
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
	</Card>
</div>
