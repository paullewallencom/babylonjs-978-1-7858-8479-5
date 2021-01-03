/// <reference path="babylon.d.ts" />
var ACTIONS;
(function (ACTIONS) {
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
        * Creates actions on the box
        * Includes conditions
        */
        Basics.prototype.createActions = function () {
            //
            // Set the box
            //
            this._box.actionManager = new BABYLON.ActionManager(this._scene);
            // Modify the box position on left-click
            this._box.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnLeftPickTrigger, this._box, "position", new BABYLON.Vector3(0, 6, 0), null // No conditions
            ))
                .then(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnLeftPickTrigger, this._box, "position", new BABYLON.Vector3(0, 2.5, 0), 1000, null, // No conditions
            false));
            // When finished, the first action will be re-executed
            //
            // Set the plane
            //
            this._plane.actionManager = new BABYLON.ActionManager(this._scene);
            // Modify the plane's rotation only if the box position on y is 6
            var condition = new BABYLON.ValueCondition(this._plane.actionManager, this._box, "position.y", 6, BABYLON.ValueCondition.IsLesser);
            this._box.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnLeftPickTrigger, this._box, "rotation", new BABYLON.Vector3(0, Math.PI / 3, 0), condition));
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
            var boxTexture = new BABYLON.Texture("wood.jpg", this._scene);
            // Materials
            var planeMaterial = new BABYLON.StandardMaterial("plane_material", this._scene);
            planeMaterial.diffuseTexture = diffuseTexture;
            planeMaterial.bumpTexture = bumpTexture;
            var boxMaterial = new BABYLON.StandardMaterial("box_material", this._scene);
            boxMaterial.diffuseTexture = boxTexture;
            // Meshes
            this._plane = BABYLON.Mesh.CreateGround("ground", 100, 100, 2, this._scene);
            this._plane.material = planeMaterial;
            this._box = BABYLON.Mesh.CreateBox("box", 5, this._scene);
            this._box.refreshBoundingInfo();
            this._box.position.y = 2.5;
            this._box.material = boxMaterial;
        };
        return Basics;
    })();
    ACTIONS.Basics = Basics;
})(ACTIONS || (ACTIONS = {}));
