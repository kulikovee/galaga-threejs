import Renderer from './js/Renderer.js';
import Scene from './js/Scene.js';
import Level1 from './js/Levels/Level1.js';

window.addEventListener('load', function () {
    const container = document.getElementById('container'),
        renderer = new Renderer(container),
        scene = new Scene(renderer),
        level = new Level1(scene),
        onResize = () => {
            scene.camera.camera.aspect = container.clientWidth / container.clientHeight;
            scene.camera.camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        },
        requestPointerLock = () => !scene.ui.pause && renderer.requestPointerLock();

    scene.setLevel(level);
    level.startLevel();

    window.addEventListener('resize', onResize, false);
    document.body.addEventListener('click', requestPointerLock, false);
});

// ThreeJS stats
(function () {
    var script = document.createElement('script');
    script.onload = function () {
        var stats = new Stats();
        document.body.appendChild(stats.dom);
        requestAnimationFrame(function loop() {
            stats.update();
            requestAnimationFrame(loop)
        });
    };
    script.src = '//mrdoob.github.io/stats.js/build/stats.min.js';
    document.head.appendChild(script);
})();
