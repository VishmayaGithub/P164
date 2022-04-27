
AFRAME.registerComponent("splash", {
    init: function () {
        this.shootBullet();
    },
    shootBullet: function () {
        window.addEventListener("keydown", (e) => {
            if (e.key === "z") {
                var bullet = document.createElement("a-entity");

                bullet.setAttribute("geometry", {
                    primitive: "sphere",
                    radius: 0.2,
                });

                bullet.setAttribute("material", "color", "grey");

                var cam = document.querySelector("#camera");

                pos = cam.getAttribute("position");

                bullet.setAttribute("position", {
                    x: pos.x,
                    y: pos.y,
                    z: pos.z,
                });



                var camera = document.querySelector("#camera").object3D;

                //get the camera direction as Three.js Vector
                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction);

                //set the velocity and it's direction
                bullet.setAttribute("velocity", direction.multiplyScalar(-12));

                var scene = document.querySelector("#scene");

                bullet.setAttribute("dynamic-body", { mass: 0, shape: "sphere" })

                bullet.addEventListener("collide", this.removeBullet)

                scene.appendChild(bullet);

                this.shootSound();


            }
        });
    },

    removeBullet: function (e) {
        //Original entity (bullet)
        console.log(e.detail.target.el);

        //Other entity, which bullet touched.
        console.log(e.detail.body.el);

        //bullet element
        var element = e.detail.target.el
        //element which is hit
        var elementHit = e.detail.body.el


        if (elementHit.id.includes("wall")) {
            //set material attribute
            elementHit.setAttribute("material", {
                opacity: 1,
                transparent: true
            })

            //impulse and point vector
            //   var impulse = new CANNON.Vec3(-2 , 2, 1)
            //   var worldPoint = new CANNON.Vec3().copy(
            //     elementHit.getAttribute("position")
            //   )
            //   element.body.applyImpulse(impulse, worldPoint)

            var element1 = document.createElement("a-entity")
            var scene = document.querySelector("#scene")
            var pos = element.getAttribute("position")
            

            var rotate = elementHit.getAttribute("rotation")
            element1.setAttribute("visible", true)
            element1.setAttribute("position", {
                x: pos.x,
                y: pos.y,
                z: pos.z
            })
            element1.setAttribute("rotation", {
                x: rotate.x,
                y: rotate.y,
                z: rotate.z
            })
           
            element1.setAttribute("scale",{
                x : 3,
                y : 3,
                z : 3
            })
            element1.setAttribute("geometry", {
                primitive: "plane",
                width : 0.5,
                height  : 0.5
            })
            var colorNumber = parseInt(Math.random() * 6 + 1)
            element1.setAttribute("material", {
                src: "./image/splash" + colorNumber + ".png",
                opacity : 1,
                transparent : true
            })
            scene.appendChild(element1)




            //remove event listener
            element.removeEventListener("collide", this.shoot)

            //remove the bullets from the scene
            var scene = document.querySelector("#scene")
            scene.removeChild(element)
        }
    },
    shootSound: function () {
        var sound = document.querySelector("#sound1")
        sound.components.sound.playSound()
    }
});