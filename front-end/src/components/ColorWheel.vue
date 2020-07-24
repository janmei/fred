<template>
	<div class="wheel-picker">
		<main class="wheel-picker--main">
			<div class="wheel-picker--main--wheelbox">
				<div
					class="wheel"
					ref="parent"
					:style="{
						width: wheelSize + 'px',
						height: wheelSize + 'px',
						position: 'relative',
						margin: '0 auto',
					}"
				>
					<img
						:src="image.src"
						alt="Color Wheel"
						:style="image.style"
						draggable="true"
						@click="clickMove"
						ondragstart="return false;"
						v-dragpicker="captureMovement"
					/>
					<span
						class="wheel--picker"
						:style="{
							width: pickerSize + 'px',
							height: pickerSize + 'px',
							backgroundColor: 'white',
							borderRadius: '50%',
							border: '1px solid black',
							top: pickerTop + 'px',
							left: pickerLeft + 'px',
							position: 'absolute',
						}"
						v-dragpicker="captureMovement"
					></span>
				</div>
			</div>
			<div class="slider-box">
				<div class="slider">
					<label for="brightness">Brightness: {{ color.hsb.b }}</label
					><br />
					<input
						id="brightness"
						type="range"
						min="0"
						max="254"
						step="1"
						v-model="color.hsb.b"
					/>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
export default {
	name: "WheelPicker",
	props: {
		h: Number,
		s: Number,
		b: Number,
	},
	data: function() {
		return {
			wheelSize: 120,
			pickerSize: 8,
			pickerTop: 50,
			pickerLeft: 50,
			image: {
				src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/435311/ryb.png",
				style: {
					width: "100%",
					height: "auto",
					"user-select": "none",
				},
			},
			color: {
				hsb: {
					h: this.h,
					s: this.s,
					b: this.b,
				},
			},
		};
	},
	directives: {
		dragpicker: {
			bind: function(element, binding) {
				let mousemove = function(e) {
					binding.value(e);
					return false;
				};
				let mouseup = function() {
					document.removeEventListener("mousemove", mousemove);
					document.removeEventListener("mouseup", mouseup);
					return false;
				};
				element.addEventListener("mousedown", function() {
					document.addEventListener("mousemove", mousemove);
					document.addEventListener("mouseup", mouseup);
					return false;
				});
			},
		},
	},
	methods: {
		hsbHue: function(hue) {
			hue = (hue * 180) / Math.PI; // radians to degrees

			let to, from, a, b, c, d;

			from = [
				[0, 60],
				[60, 120],
				[120, 240],
				[240, 360],
			];
			to = [
				[0, 120],
				[120, 180],
				[180, 240],
				[240, 360],
			];

			if (hue === 360) {
				return hue;
			}

			for (let x in to) {
				if (hue >= to[x][0] && hue <= to[x][1]) {
					a = to[x][0];
					b = to[x][1];
					c = from[x][0];
					d = from[x][1];
				}
			}

			return c + (hue - a) * ((d - c) / (b - a));
		},
		clickMove: function(e) {
			this.captureMovement(e);
		},
		captureMovement: function(e) {
			let h, s;
			let parent = this.$refs.parent;

			let parentWidth = parent.clientWidth;
			// parentHeight = parent.clientHeight;

			let offsetX = parent.getBoundingClientRect().left,
				offsetY = parent.getBoundingClientRect().top;

			let clientX =
				typeof e.clientX === "undefined"
					? e.changedTouches[0].clientX
					: e.clientX;

			let clientY =
				typeof e.clientY === "undefined"
					? e.changedTouches[0].clientY
					: e.clientY;

			let x = Math.round(clientX - offsetX),
				y = Math.round(clientY - offsetY);

			let maxR = parentWidth / 2;
			let rx = maxR - x,
				ry = maxR - y;

			let r = Math.sqrt(rx * rx + ry * ry);
			let angle = Math.atan2(ry, rx);

			angle = angle < 0 ? (angle += Math.PI * 2) : angle;

			if (r > maxR) {
				r = maxR;
				x = maxR - maxR * Math.cos(angle);
				y = maxR - maxR * Math.sin(angle);
			}

			x = Math.round(x);
			y = Math.round(y);

			h = this.hsbHue(angle);
			s = Math.floor((r / maxR) * 100);

			this.pickerLeft = x - this.pickerSize / 2;
			this.pickerTop = y - this.pickerSize / 2;

			this.color.hsb.h = h;
			this.color.hsb.s = s;

			e.preventDefault();
			e.stopPropagation();
		},
	},
	created: function() {
		this.$watch(
			"color.hsb",
			function(newValue) {
				newValue.b = parseFloat(newValue.b);
				this.$emit("changed", newValue);
			},
			{ deep: true }
		);
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.sample {
	width: 100%;
	height: 140px;
	margin: 0 auto;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	margin-top: 30px;
}
.sample span {
	mix-blend-mode: difference;
	color: orange;
	font-size: 24px;
}

[for="brightness"] {
	color: white;
}
</style>
