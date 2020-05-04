var text = document.getElementById('typing');

var typewriter = new Typewriter(text, {
    loop: true
});

typewriter.typeString('Full-Stack Developer')
    .pauseFor(1000)
    .deleteAll()
    .typeString('UX /UI Design')
    .pauseFor(1000)
    .start();