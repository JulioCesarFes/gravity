window.onload = () => {


let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

let w = canvas.width = 500
let h = canvas.height = 500

let lastTrace = 500
let tt = 0
let tm = 1

let objs = []
let toDelete = []

objs.push({x: 50, y: 100, vx: 2.3, vy: 0, mass: 50, trace: []})
objs.push({x: 100, y: 250, vx: 0.1, vy: 0, mass: 1000, trace: []})


// for (let i = 0; i < 100; i++) {

// 	let x    = 0 + Math.floor(Math.random() * w)
// 	let y    = 0 + Math.floor(Math.random() * h)
// 	let vx   = 0 + Math.floor(Math.random() * 1)
// 	let vy 	 = 0 + Math.floor(Math.random() * 1)
// 	let mass = 5 + Math.floor(Math.random() * 10)

// 	objs.push({x, y, vx, vy, mass, trace: []})

// }


objs = objs.map(o => Object.assign(o, {r: (Math.log(o.mass))}))


let TAU = Math.PI * 2

setInterval(function () {

	for (let i in objs) {

		let o1 = objs[i]

		for (let j in objs) {

			if (i == j) continue

			let o2 = objs[j]

			let g = -1 // constante gravitacional universal ???

			let m1 = o1.mass
			let m2 = o2.mass


			let c1 = o1.x - o2.x
			let c2 = o1.y - o2.y
			let d = Math.abs(Math.sqrt(Math.pow(c1, 2) + Math.pow(c2, 2)))

			let f = g * m1 * m2 / Math.pow(d, 2)

			let a = Math.atan2(c2, c1)
			let acc = f / m1

			o1.vx += Math.cos(a) * acc
			o1.vy += Math.sin(a) * acc
		}

		if (tt == 0) {
			o1.trace.unshift([o1.x, o1.y])
			if (o1.trace.length > lastTrace + 1) o1.trace.pop()
		}

		o1.x += o1.vx
		o1.y += o1.vy

		// if (o1.x <= 0 + o1.mass && o1.vx < 0) o1.vx *= -1
		// if (o1.y <= 0 + o1.mass && o1.vy < 0) o1.vy *= -1
		// if (o1.x >= w - o1.mass && o1.vx > 0) o1.vx *= -1
		// if (o1.y >= h - o1.mass && o1.vy > 0) o1.vy *= -1

		// if ((o1.x <= 0 - o1.mass) || (o1.y <= 0 - o1.mass) || (o1.x >= w + o1.mass) || (o1.y >= h + o1.mass)) {
		// 	toDelete.push(i)
		// }
	}

	for (let i of toDelete) {
		objs.splice(i, 1)
	}

	toDelete = []

	tt++

	if (tt > tm) tt = 0
}, 10)
function frame () {

	ctx.clearRect(0, 0, w, h)
	
	ctx.fillStyle = 'lightgrey'

	ctx.fillRect(0, 0, w, h)


	ctx.fillStyle = 'black'

	for (let o of objs) {
		ctx.save()
		ctx.translate(o.x, o.y)
		ctx.beginPath()
		ctx.arc(0, 0, o.r, 0, TAU)
		ctx.fill()
		ctx.restore()
	}


	ctx.strokeStyle = 'white'

	for (let o of objs) {
		ctx.save()
		ctx.translate(o.x, o.y)
		ctx.beginPath()
		ctx.arc(0, 0, o.r, 0, TAU)
		ctx.stroke()
		ctx.restore()
	}


	ctx.strokeStyle = 'white'
	ctx.lineWidth = 2

	for (let o of objs) {
		ctx.beginPath()
		ctx.moveTo(o.x, o.y)
		for (let [x, y] of o.trace) {
			ctx.lineTo(x, y)
		}
		ctx.stroke()
	}

	ctx.strokeStyle = 'black'
	ctx.lineWidth = 1

	for (let o of objs) {
		ctx.beginPath()
		ctx.moveTo(o.x, o.y)
		for (let [x, y] of o.trace) {
			ctx.lineTo(x, y)
		}
		ctx.stroke()
	}


	// ctx.strokeStyle = 'lime'

	// for (let o of objs) {
	// 	ctx.save()
	// 	ctx.translate(o.x, o.y)
	// 	ctx.beginPath()
	// 	ctx.moveTo(0, 0)
	// 	ctx.lineTo(o.vx * 100, o.vy * 100)
	// 	ctx.stroke()
	// 	ctx.restore()
	// }


	window.requestAnimationFrame(frame)
} frame()
}