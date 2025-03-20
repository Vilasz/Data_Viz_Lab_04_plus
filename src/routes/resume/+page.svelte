<svelte:head>
  <title>Resume</title>
</svelte:head>

<body>
    <!-- Navigation menu -->

    <!-- Main header for the resume page -->
    <header>
        <h1>João Felipe Vilas Boas</h1>
        <p>Brilliant CV / Resume</p>
    </header>

    <!-- Professional Summary Section -->
    <section>
        <header>
            <h2>Professional Summary</h2>
        </header>
        <p>Innovative and dedicated professional with a passion for technology, design, and creative problem solving. Eager to drive innovation and enhance user experiences through cutting-edge web development and design.</p>
    </section>

    <!-- Work Experience Section -->
    <section>
        <header>
            <h2>Work Experience</h2>
        </header>
        <!-- Each job as an article -->
        <article>
            <header>
                <h3>Front-end Developer</h3>
                <time datetime="2022-01">Jan 2022 - Present</time>
            </header>
            <p>Developed interactive and responsive web applications using HTML, CSS, and JavaScript while collaborating with design and backend teams.</p>
        </article>
        <article>
            <header>
                <h3>Graphic Designer</h3>
                <time datetime="2020-06">Jun 2020 - Dec 2021</time>
            </header>
            <p>Created visually appealing graphics and digital media for various online platforms, ensuring consistency with brand identity.</p>
        </article>
    </section>

    <!-- Education Section -->
    <section>
        <header>
            <h2>Education</h2>
        </header>
        <article>
            <header>
                <h3>Bachelor of Arts in Design</h3>
                <time datetime="2016-09">Sep 2016 - Jun 2020</time>
            </header>
            <p>University of Creativity and Technology</p>
        </article>
    </section>

    <!-- Skills Section -->
    <section>
        <header>
            <h2>Skills</h2>
        </header>
        <ul>
            <li>HTML &amp; CSS</li>
            <li>JavaScript</li>
            <li>Responsive Web Design</li>
            <li>Adobe Creative Suite</li>
            <li>UI/UX Design</li>
        </ul>
    </section>

    <!-- Contact Footer -->
    <footer>
        <p>For inquiries, please contact: <a href="mailto:joao@example.com">joao@example.com</a></p>
    </footer>
</body>