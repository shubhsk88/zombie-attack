import Phaser from 'phaser';
import gameSettings from '../../game-settings';

class Zombie extends Phaser.GameObjects.Sprite {
  constructor(scene, zombie) {
    const startPositionX = Phaser.Math.Between(25, gameSettings.canvasWidth - 25);
    const startPositionY = -100;
    super(scene, startPositionX, startPositionY, `${zombie}-move`);

    this.zombie = zombie;
    this.scene.add.existing(this);

    // physics
    scene.physics.world.enableBody(this);

    // add to group
    scene.zombies.add(this);

    this.anims.play(`${zombie}-move_anim`, true);
    this.isDead = false;
    this.move();
  }

  update() {
    if (this.y > gameSettings.canvasHeight) {
      this.resetPos();
    }
  }

  resetPos() {
    this.y = -75;
    const randomX = Phaser.Math.Between(25, gameSettings.canvasWidth - 25);
    this.x = randomX;
  }

  move() {
    this.body.velocity.y = 100 + (100 / 10);
  }

  revive() {
    this.isDead = false;
    this.anims.stop(null, false);
    this.anims.play(`${this.zombie}-move_anim`, true);
    this.resetPos();
    this.move();
  }

  die() {
    this.isDead = true;
    this.anims.stop(null, false);
    this.anims.play(`${this.zombie}-die_anim`, true);
    this.body.velocity.y = 0;

    this.scene.time.addEvent({
      delay: 2000,
      callback: this.revive,
      callbackScope: this,
      loop: false,
    });
  }
}

export default Zombie;