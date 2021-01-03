/// <reference path="babylon.d.ts" />
var POSTPROCESSES;
(function (POSTPROCESSES) {
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
            this._light = new BABYLON.PointLight("Point", new BABYLON.Vector3(-60, 60, 80), this._scene);
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
        * Creates a post-process and
        */
        Basics.prototype.createBlurPostProcess = function () {
            var blurH = new BABYLON.BlurPostProcess("blurH", new BABYLON.Vector2(1, 0), 8, 0.5, this._camera);
            var blurV = new BABYLON.BlurPostProcess("blurV", new BABYLON.Vector2(0, 1), 8, 0.5, this._camera);
            var bw = new BABYLON.BlackAndWhitePostProcess("bw", 1.0, this._camera);
        };
        /**
        * Creates a post-process render piepline
        */
        Basics.prototype.createRenderPipeline = function () {
            var _this = this;
            // Create rendering pipeline
            var pipeline = new BABYLON.PostProcessRenderPipeline(this._engine, "renderingPipeline");
            // Create effects
            pipeline.addEffect(new BABYLON.PostProcessRenderEffect(this._engine, "blurHEffect", function () {
                return new BABYLON.BlurPostProcess("blurH", new BABYLON.Vector2(1, 0), 8, 0.5, null, BABYLON.Texture.BILINEAR_SAMPLINGMODE, _this._engine);
            }));
            pipeline.addEffect(new BABYLON.PostProcessRenderEffect(this._engine, "blurVEffect", function () {
                return new BABYLON.BlurPostProcess("blurV", new BABYLON.Vector2(0, 1), 8, 0.5, null, BABYLON.Texture.BILINEAR_SAMPLINGMODE, _this._engine);
            }));
            pipeline.addEffect(new BABYLON.PostProcessRenderEffect(this._engine, "blackAndWhiteEffect", function () {
                return new BABYLON.BlackAndWhitePostProcess("bw", 1.0, null, BABYLON.Texture.BILINEAR_SAMPLINGMODE, _this._engine);
            }));
            // Add pipeline to the scene
            this._scene.postProcessRenderPipelineManager.addPipeline(pipeline);
            // Attach to camera
            this._scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("renderingPipeline", this._camera);
        };
        /**
        * Detaches the render pipeline from the camera
        */
        Basics.prototype.detachRenderPipeline = function () {
            this._scene.postProcessRenderPipelineManager.detachCamerasFromRenderPipeline("renderingPipeline", this._camera);
        };
        /**
        * Disables the blur post-processes of the render pipeline
        * Only the "black and white" post-process is enabled
        */
        Basics.prototype.disableBlurOnRenderPipeline = function () {
            this._scene.postProcessRenderPipelineManager.disableEffectInPipeline("renderingPipeline", "blurHEffect", this._camera);
            this._scene.postProcessRenderPipelineManager.disableEffectInPipeline("renderingPipeline", "blurVEffect", this._camera);
        };
        /**
        * Enables the blur post-processes of the render pipeline
        * The full pipeline is enabled
        */
        Basics.prototype.enableBlurOnRenderPipeline = function () {
            this._scene.postProcessRenderPipelineManager.enableEffectInPipeline("renderingPipeline", "blurHEffect", this._camera);
            this._scene.postProcessRenderPipelineManager.enableEffectInPipeline("renderingPipeline", "blurVEffect", this._camera);
        };
        /**
        * Creates a "volumetric light scattering" post-process
        * The post-process isn't added to any pipeline and is directly
        * attached to the camera
        */
        Basics.prototype.createVolumetricLightScatteringPostProcess = function (useDiffuseColor) {
            var _this = this;
            if (useDiffuseColor === void 0) { useDiffuseColor = false; }
            // Import the status model
            BABYLON.SceneLoader.ImportMesh("", "./", "vls.babylon", this._scene, function (meshes) {
                _this._box.dispose();
                meshes[0].scaling = new BABYLON.Vector3(4, 4, 4);
                meshes[0].rotation.y = -Math.PI / 2;
            });
            // Create the Volumetric Light Scattering post-process
            var vls = new BABYLON.VolumetricLightScatteringPostProcess("vls", {
                passRatio: 1.0,
                postProcessRatio: 1.0
            }, this._camera, null, 100);
            vls.density = 0.7;
            // Material of the VLS mesh
            var vlsMaterial = new BABYLON.StandardMaterial("vlsMaterial", this._scene);
            vlsMaterial.diffuseTexture = new BABYLON.Texture("sun.png", this._scene);
            vlsMaterial.diffuseTexture.hasAlpha = true;
            if (useDiffuseColor) {
                vls.useDiffuseColor = true;
                vlsMaterial.diffuseColor = new BABYLON.Color3(1.0, 0.5, 0.0); // Orange
            }
            // Configure the vls mesh (we kept the default mesh)
            vls.mesh.material = vlsMaterial;
            vls.mesh.position = new BABYLON.Vector3(150, 150, 150);
            vls.mesh.scaling = new BABYLON.Vector3(150, 150, 150);
        };
        /**
        * Creates the HDR renderping pipeline
        */
        Basics.prototype.createHDRRenderPipeline = function () {
            var hdr = new BABYLON.HDRRenderingPipeline("hdr", this._scene, 1.0);
            hdr.brightThreshold = 0.5;
            hdr.gaussCoeff = 0.5;
            hdr.gaussMean = 1.0;
            hdr.gaussStandDev = 7.5;
            hdr.minimumLuminance = 0.3;
            hdr.luminanceDecreaseRate = 0.4;
            hdr.luminanceIncreaserate = 0.4;
            hdr.exposure = 1.0;
            hdr.gaussMultiplier = 4;
            this._scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("hdr", this._camera);
        };
        /**
        * Creates the SSAO rendering pipeline
        */
        Basics.prototype.createSSAORenderPipeline = function () {
            var _this = this;
            this._box.dispose();
            this._plane.dispose();
            // Create some boxes and deactivate lighting (specular color and back faces)
            var boxMaterial = this._scene.getMaterialByName("box_material");
            boxMaterial.specularColor = BABYLON.Color3.Black();
            boxMaterial.emissiveColor = BABYLON.Color3.White();
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    var box = BABYLON.Mesh.CreateBox("box" + i + " - " + j, 5, this._scene);
                    box.position = new BABYLON.Vector3(i * 5, 2.5, j * 5);
                    box.rotation = new BABYLON.Vector3(i, i * j, j);
                    box.material = boxMaterial;
                }
            }
            var ssao = new BABYLON.SSAORenderingPipeline("ssao", this._scene, { ssaoRatio: 0.5, combineRatio: 1.0 });
            ssao.fallOff = 0.0;
            ssao.area = 0.0075;
            ssao.radius = 0.0001;
            ssao.totalStrength = 1.0;
            ssao.getBlurHPostProcess().direction.x = 1;
            ssao.getBlurHPostProcess().blurWidth = 2;
            ssao.getBlurVPostProcess().direction.y = 1;
            ssao.getBlurVPostProcess().blurWidth = 2;
            this._scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("ssao", this._camera);
            window.addEventListener("keydown", function (evt) {
                // draw SSAO with scene when pressed "1"
                if (evt.keyCode === 49) {
                    _this._scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("ssao", _this._camera);
                    _this._scene.postProcessRenderPipelineManager.enableEffectInPipeline("ssao", ssao.SSAOCombineRenderEffect, _this._camera);
                }
                else if (evt.keyCode === 50) {
                    _this._scene.postProcessRenderPipelineManager.detachCamerasFromRenderPipeline("ssao", _this._camera);
                }
                else if (evt.keyCode === 51) {
                    _this._scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("ssao", _this._camera);
                    _this._scene.postProcessRenderPipelineManager.disableEffectInPipeline("ssao", ssao.SSAOCombineRenderEffect, _this._camera);
                }
            });
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
    POSTPROCESSES.Basics = Basics;
})(POSTPROCESSES || (POSTPROCESSES = {}));
