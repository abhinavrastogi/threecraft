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

var timer1, timer2;

function addTimers() {
	timer1 = setTimeout(function() {
		progress.classList.add('show');
		timer2 = setTimeout(function () {
			progress.classList.remove('show');
			removeObject(getObjectAtCursor());
		}, 370);
	}, 30);
}

window.addEventListener('mousedown', function(event) {
	if(event.which === 1) {
		addTimers();
	}
});
window.addEventListener('mousemove', function(event) {
	if(timer1 || timer2) {
		progress.classList.remove('show');
		clearTimeout(timer1);
		clearTimeout(timer2);
	}
});
window.addEventListener('mouseup', function(event) {
	progress.classList.remove('show');
	clearTimeout(timer1);
	clearTimeout(timer2);
	if(event.which === 3) {
		var obj = getObjectAtCursor();
		if(obj) {
			var outline = new THREE.Mesh(geometryBlock, materials['blockDirt'], 0);
			outline.castShadow = true;
			outline.receiveShadow = true;
			outline.position.set(obj.position.x, obj.position.y + 1, obj.position.z);
			scene.add(outline);
		}
	}
});

function request () {
	var element = renderer.domElement;
	document.addEventListener('pointerlockchange', function (event) {
		controls.enabled = document.pointerLockElement === element;
		render();
	}, false);

	if ('pointerLockElement' in document) {
		element.requestPointerLock();
	}
	document.removeEventListener('click', request);
};

document.addEventListener('click', request, false);

var onKeyDown = function ( event ) {
	switch ( event.keyCode ) {

		case 38: // up
		case 87: // w
		moveForward = true;
		//console.log(player._physijs);
		break;

		case 37: // left
		case 65: // a
		moveLeft = true;
			break;

		case 40: // down
		case 83: // s
		moveBackward = true;
		break;

		case 39: // right
		case 68: // d
		moveRight = true;
		break;

		case 32: // space
			event.preventDefault();
		if ( canJump === true ) velocity.y += 10;
		canJump = false;
		break;

		case 73:
			player.__dirtyPosition = true;
			player.position.x += 0.5;
		break;
		case 74:
			player.__dirtyPosition = true;
			player.position.z += 0.5;
			break;
		case 75:
			player.__dirtyPosition = true;
			player.position.x -= 0.5;
			break;
		case 76:
			player.__dirtyPosition = true;
			player.position.z -= 0.5;
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
