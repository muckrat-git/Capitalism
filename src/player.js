import { MathUtil } from './mathutil.js';

export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocity = {x: 0, y: 0};
        this.mouse = {x:0, y:0};
        this.destination = {x:0, y:0, set:false, type:null};
        this.zoom = 0.5;
        this.zoomVelocity = 1;
        this.rotation = 0;
        this.ip = CLIENTID;
        this.speed = 300;
    }

    update(deltaTime) {
        this.x += this.velocity.x * deltaTime;
        this.y += this.velocity.y * deltaTime;

        this.velocity.x = MathUtil.lerp(this.velocity.x, 0, deltaTime * 5);
        this.velocity.y = MathUtil.lerp(this.velocity.y, 0, deltaTime * 5);

        this.zoom *= this.zoomVelocity;
        this.zoomVelocity = MathUtil.lerp(this.zoomVelocity, 1, deltaTime * 3);

        if(this.zoom < 0.01) this.zoom = 0.01;

        if(this.destination.set) {
            this.velocity.x += Math.cos(this.rotation) * this.speed * deltaTime;
            this.velocity.y += Math.sin(this.rotation) * this.speed * deltaTime;

            this.rotation = MathUtil.rLerp(
				this.rotation, 
				Math.atan2(this.destination.y - this.y, this.destination.x - this.x), 
				deltaTime * 10
			);

            this.zoom = MathUtil.lerp(this.zoom, this.destination.zoom, deltaTime * 2);

            if(MathUtil.distance(this.x, this.y, this.destination.x, this.destination.y) < 300 * deltaTime) {
                this.destination.set = false;
            }
        }
        else this.rotation = Math.atan2(this.velocity.y, this.velocity.x);
    }
};