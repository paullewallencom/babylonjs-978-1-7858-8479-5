/// <reference path="babylon.d.ts" />
var BASICS;
(function (BASICS) {
    /*
    * The keyword "export" is used to tell the TypeScript compiler to make
    * the class "visible" in the window scope
    */
    var BasicScene = (function () {
        function BasicScene(canvas) {
            // Engine
            this._engine = new BABYLON.Engine(canvas);
            // Scene
            this._scene = new BABYLON.Scene(this._engine);
            // Camera
            this.camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 30, BABYLON.Vector3.Zero(), this._scene);
            this.camera.attachControl(canvas, true);
            // Light
            this.light = new BABYLON.PointLight("light", new BABYLON.Vector3(20, 20, 20), this._scene);
            this.light.diffuse = new BABYLON.Color3(0, 1, 0);
            this.light.specular = new BABYLON.Color3(1, 0, 1);
            this.light.intensity = 1.0;
            // Cube
            this.box = BABYLON.Mesh.CreateBox("cube", 5, this._scene);
        }
        /*
        * Use graphs.The new parent of the light is the camera.
        * Then, the light's position will be the same as the camera
        */
        BasicScene.prototype.setCameraParentOfLight = function () {
            this.light.position = BABYLON.Vector3.Zero();
            this.light.parent = this.camera;
        };
        /*
        * The render loop
        * The render loop is called every frame (60 per second) which renders the scene
        */
        BasicScene.prototype.runRenderLoop = function () {
            var _this = this;
            this._engine.runRenderLoop(function () {
                _this._scene.render();
            });
        };
        return BasicScene;
    })();
    BASICS.BasicScene = BasicScene;
})(BASICS || (BASICS = {}));
