export default class Camera {
    /**
     * @param {Scene} scene
     */
    constructor(scene) {
        this.scene = scene;
        const ratio = this.getWidth() / this.getHeight();
        this.camera = new THREE.PerspectiveCamera(45, ratio, 1, 100000);
        this.camera.position.set(5, 3, 15);

        this.toScreenPosition = this.toScreenPosition.bind(this);
        this.update = this.update.bind(this);
        this.getWidth = this.getWidth.bind(this);
        this.getHeight = this.getHeight.bind(this);
    }

    update() {
        if (!this.player) return;

        const cameraPosition = this.player.position.clone();

        cameraPosition.sub(
            this.player.getDirection(
                new THREE.Vector3(0, 0, window.innerHeight / 20)
            )
        );

        cameraPosition.y += 3;
        let distance = this.camera.position.distanceTo(cameraPosition);

        if (distance < 1) {
            distance = 1;
        }

        const speed = (25 / distance + 1) || 1;

        if (this.camera && this.camera.position && cameraPosition) {
            this.camera.position.sub(
                this.camera.position
                    .clone()
                    .sub(cameraPosition)
                    .multiplyScalar(1 / speed)
            );
        }

        this.camera.lookAt(this.player.object.position);
    }

    getWidth() {
        const renderer = this.scene.renderer.renderer;
        return renderer.getContext().canvas.width;
    }

    getHeight() {
        const renderer = this.scene.renderer.renderer;
        return renderer.getContext().canvas.height;
    }

    toScreenPosition(obj) {
        const vector = new THREE.Vector3();

        const widthHalf = 0.5 * this.getWidth();
        const heightHalf = 0.5 * this.getHeight();

        obj.updateMatrixWorld();
        vector.setFromMatrixPosition(obj.matrixWorld);
        vector.project(this.camera);

        vector.x = (vector.x * widthHalf) + widthHalf;
        vector.y = -(vector.y * heightHalf) + heightHalf;

        return {
            x: vector.x,
            y: vector.y
        };

    };
}