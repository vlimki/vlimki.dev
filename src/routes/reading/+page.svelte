<script lang="ts">
  import PageBreak from '$lib/components/PageBreak.svelte';
  import Book from '$lib/components/Book.svelte';

</script>

<svelte:head>
  <title>Reading List · Juho Välimäki</title> 
  <meta name="description" content="Here I discuss some of the books I'm reading and how they've helped me." />
</svelte:head> 


<div class="flex flex-col justify-between">
  <div class="flex flex-col">
    <h1 class="font-medium mb-2">Reading List</h1>

	<p>A collection of books, articles, and online resources I'm reading or plan to read. <br/>Mainly mathematics, machine learning and GPUs, but also other topics.</p>
	<h2 class="mb">Mathematics, GPUs, Machine Learning</h2>
	<p class="mb-3 text-[#666666] text-sm">Note: Most of these books are from <a href="https://sheafification.com/the-fast-track/" rel="noreferrer" target="_blank">The Fast Track</a>.</p>
	<div class="flex flex-col">
		<ul class="grid grid-cols-2">
			<li>
				<Book title="Linear Algebra" description="" imageUrl="/images/books/shilov.jpg" author="Georgi E. Shilov" />
				</li>
			<li>
				<Book title="Calculus" description="" imageUrl="/images/books/apostol.jpg" author="Tom M. Apostol" />
			</li>
			<li>
				<Book description="" title="Programming Massively Parallel Processors" imageUrl="/images/books/pmpp.jpg" author="David B. Kirk, Wen-mei W. Hwu" />
			</li>
			<li>
				<Book description="" title="Ordinary Differential Equations" imageUrl="/images/books/pmpp.jpg" author="Vladimir I. Arnold" />
			</li>
			<li>
				<Book description="" title="Lectures on Differential Geometry" imageUrl="/images/books/pmpp.jpg" author="Shlomo Z. Sternberg" />
			</li>
		</ul>
	</div>
	<h2 class="mb-3">Physics</h2>
	<div class="flex flex-col">
		<ul class="grid grid-cols-2">
			<li>
				<Book description="" title="Mechanics, Volume 1" imageUrl="/images/books/pmpp.jpg" author="Lev D. Landau, Evgeny M. Lifshitz" />
			</li>
			<li>
				<Book description="" title="The Classical Theory of Fields, Volume 2" imageUrl="/images/books/pmpp.jpg" author="Lev D. Landau, Evgeny M. Lifshitz" />
			</li>
		</ul>
	</div>
	<h2 class="mb-3">Other</h2>
	<ul class="grid grid-cols-2">
		<li>
			<Book title="The Brothers Karamazov" description="" imageUrl="/images/books/bk.jpg" author="Fyodor M. Dostoevsky" />
		</li>
		<li>
			<Book title="The Gambler" description="" imageUrl="/images/books/bk.jpg" author="Fyodor M. Dostoevsky" />
		</li>
	</ul>
	<PageBreak/>
	<h2 class="mb-3">Links</h2>
  </div>
</div>
