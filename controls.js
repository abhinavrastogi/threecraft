function checkControls() {
	if ( controls.enabled ) {
		// raycaster.ray.origin.copy( controls.getObject().position );
		// raycaster.ray.origin.y -= playerHeight;
// console.log( controls.getObject().position.y);
		// var intersectionsDown = raycaster.intersectObjects(cubes);

		// raycaster.ray.direction.copy(camera.getWorldDirection());
		// var intersectionsFront = raycaster.intersectObjects(cubes);
		// var vector = camera.getWorldDirection();
		// z = (-vector.x - vector.y) / vector.z;
// console.log(intersections);
		// var isOnObject = intersectionsDown.length > 0;
		var speed = 75;
		var time = performance.now();
		var delta = ( time - prevTime ) / 1000;
		var playerY = playerHeight;

		velocity.x -= velocity.x * 15.0 * delta;
		velocity.z -= velocity.z * 15.0 * delta;

		velocity.y -= 9.8 * 5.0 * delta; // 100.0 = mass

		if ( moveForward ) velocity.z -= speed * delta;
		if ( moveBackward ) velocity.z += speed * delta;

		if ( moveLeft ) velocity.x -= speed * delta;
		if ( moveRight ) velocity.x += speed * delta;

		// if ( isOnObject === true ) {
			// playerY = playerHeight + intersectionsDown[0].object.position.y;
			// velocity.y = Math.max(0, velocity.y);
			// canJump = true;
		// }

		controls.getObject().translateX( velocity.x * delta );
		controls.getObject().translateY( velocity.y * delta );
		controls.getObject().translateZ( velocity.z * delta );

		if ( controls.getObject().position.y < playerY ) {
			velocity.y = 0;
			controls.getObject().position.y = playerY;
			canJump = true;
		}

		prevTime = time;
	}
};
var onKeyDown = function ( event ) {

	switch ( event.keyCode ) {

		case 38: // up
		case 87: // w
		moveForward = true;
		break;

		case 37: // left
		case 65: // a
		moveLeft = true; break;

		case 40: // down
		case 83: // s
		moveBackward = true;
		break;

		case 39: // right
		case 68: // d
		moveRight = true;
		break;

		case 32: // space
		if ( canJump === true ) velocity.y += 12;
		canJump = false;
		break;

	}

};

var onKeyUp = function ( event ) {

	switch( event.keyCode ) {

		case 38: // up
		case 87: // w
		moveForward = false;
		break;

		case 37: // left
		case 65: // a
		moveLeft = false;
		break;

		case 40: // down
		case 83: // s
		moveBackward = false;
		break;

		case 39: // right
		case 68: // d
		moveRight = false;
		break;

	}

};

document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );
