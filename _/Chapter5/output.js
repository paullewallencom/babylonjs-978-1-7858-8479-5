/// <reference path="babylon.d.ts" />
var COLLISIONS;
(function (COLLISIONS) {
    var Basics = (function () {
        function Basics(canvas) {
            // Engine
            this._engine = new BABYLON.Engine(canvas);
            // Scene
            this._scene = new BABYLON.Scene(this._engine);
            // Camera
            this._camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(29, 13, 23), this._scene);
            this._camera.setTarget(new BABYLON.Vector3(0, 0, 0));
            this._camera.attachControl(canvas);
            // Light
            this._light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-60, 60, 80), this._scene);
            this._light.intensity = 1;
        }
        /**
        * Runs the engine render loop
        */
        Basics.prototype.runRenderLoop = function () {
            var _this = this;
            this._engine.runRenderLoop(function () {
                _this._scene.render();
            });
        };
        /**
        * Configures collisions in scene with gravity and ellipsoid
        */
        Basics.prototype.createCollisions = function () {
            // Enable collisions in scene
            this._scene.collisionsEnabled = true;
            // Enable gravity on camera
            this._camera.applyGravity = true;
            // Configure camera to check collisions
            this._camera.checkCollisions = true;
            // Configure camera's ellipsoid
            this._camera.ellipsoid = new BABYLON.Vector3(1, 1.8, 1);
            // Configure gravity in scene
            this._scene.gravity = new BABYLON.Vector3(0, -0.03, 0);
            // Enable collisions on plane and box
            this._plane.checkCollisions = true;
            this._box.checkCollisions = true;
            this._box2.checkCollisions = true;
            this._sphere.checkCollisions = true;
        };
        /**
        * Creates physics in scene with the Oimo.js plugin
        * Uses different impostors for sphere and boxes
        */
        Basics.prototype.createPhysics = function () {
            this._scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.OimoJSPlugin());
            this._plane.setPhysicsState(BABYLON.PhysicsEngine.PlaneImpostor, { mass: 0, friction: 0.5, restitution: 0.5 });
            this._box.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 1, friction: 0.5, restitution: 0.5 });
            this._box2.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 1, friction: 0.5, restitution: 0.5 });
            this._sphere.setPhysicsState(BABYLON.PhysicsEngine.SphereImpostor, { mass: 10, friction: 0.5, restitution: 0 });
            this._box2.applyImpulse(new BABYLON.Vector3(-18, 0, 0), new BABYLON.Vector3(this._box2.position.x, 0, 0));
            this._sphere.applyImpulse(new BABYLON.Vector3(0, -10, 0), this._sphere.position);
        };
        /**
        * Disables the physics engine for bot Cannon.js and Oimo.js plugins
        */
        Basics.prototype.disablePhysics = function () {
            this._scene.disablePhysicsEngine();
        };
        /**
        * Creates a scene with a plane and 6 spheres
        */
        Basics.prototype.createScene = function () {
            // Textures
            var diffuseTexture = new BABYLON.Texture("floor_diffuse.png", this._scene);
            diffuseTexture.vScale = diffuseTexture.uScale = 5.0;
            var bumpTexture = new BABYLON.Texture("floor_bump.png", this._scene);
            bumpTexture.vScale = bumpTexture.uScale = 5.0;
            var specularTexture = new BABYLON.Texture("floor_specular.png", this._scene);
            specularTexture.vScale = specularTexture.uScale = 5.0;
            var ambientTexture = new BABYLON.Texture("floor_ao.png", this._scene);
            ambientTexture.vScale = ambientTexture.uScale = 5.0;
            var boxTexture = new BABYLON.Texture("wood.jpg", this._scene);
            var sphereTexture = new BABYLON.Texture("sphere.jpg", this._scene);
            // Materials
            var planeMaterial = new BABYLON.StandardMaterial("plane_material", this._scene);
            planeMaterial.diffuseTexture = diffuseTexture;
            planeMaterial.bumpTexture = bumpTexture;
            planeMaterial.specularTexture = specularTexture;
            planeMaterial.ambientTexture = ambientTexture;
            var boxMaterial = new BABYLON.StandardMaterial("box_material", this._scene);
            boxMaterial.diffuseTexture = boxTexture;
            var sphereMaterial = new BABYLON.StandardMaterial("sphere_material", this._scene);
            sphereMaterial.diffuseTexture = sphereTexture;
            // Meshes
            this._plane = BABYLON.Mesh.CreateGround("ground", 100, 100, 2, this._scene); // BABYLON.Mesh.CreatePlane("plane", 100, this._scene);
            //this._plane.rotation.x = Math.PI / 2;
            this._plane.material = planeMaterial;
            this._box = BABYLON.Mesh.CreateBox("box", 5, this._scene);
            this._box.refreshBoundingInfo();
            this._box.position.y = 2.5;
            this._box.material = boxMaterial;
            this._box2 = this._box.clone("box2");
            this._box2.position.x = 20;
            this._sphere = BABYLON.Mesh.CreateSphere("sphere", 6, 3, this._scene);
            this._sphere.position.x = 3;
            this._sphere.position.y = 18;
            this._sphere.material = sphereMaterial;
            // Show bounding boxes of meshes (default is false)
            //this._plane.showBoundingBox = true;
            //this._box.showBoundingBox = true;
            //this._sphere.showBoundingBox = true;
        };
        return Basics;
    })();
    COLLISIONS.Basics = Basics;
})(COLLISIONS || (COLLISIONS = {}));
