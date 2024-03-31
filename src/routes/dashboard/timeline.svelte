<script>
	import { Timeline, TimelineItem, Hr, Card } from 'flowbite-svelte';
</script>

<Card class="col-span-3 w-full max-w-full border-2 border-gray-300 dark:border-gray-700">
	<h5 class="mb-3 text-3xl font-bold leading-none text-gray-900 dark:text-white">
		Project Timeline
	</h5>
	<Hr classHr="my-3 h-1" />
	<p class="mb-6 text-base font-normal text-gray-500 dark:text-gray-400">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl ac
		ultricies consectetur, velit elit aliquet elit, id aliquam nunc nunc id mauris. Sed euismod,
		nisl ac ultricies consectetur, velit elit aliquet elit, id aliquam nunc nunc id mauris.
	</p>
	<Timeline>
		<TimelineItem title="Application UI code in Tailwind CSS" date="February 2022">
			<p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
				Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar,
				and pre-order E-commerce & Marketing pages.
			</p>
		</TimelineItem>
		<TimelineItem title="Application UI code in Tailwind CSS" date="March 2022">
			<p class="text-base font-normal text-gray-500 dark:text-gray-400">
				All of the pages and components are first designed in Figma and we keep a parity between the
				two versions even as we update the project.
			</p>
		</TimelineItem>
		<TimelineItem title="Application UI code in Tailwind CSS" date="April 2022">
			<p class="text-base font-normal text-gray-500 dark:text-gray-400">
				Get started with dozens of web components and interactive elements built on top of Tailwind
				CSS.
			</p>
		</TimelineItem>
	</Timeline>
</Card>
