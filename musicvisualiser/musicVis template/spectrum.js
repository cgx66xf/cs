function Spectrum(){
	this.name = "spectrum";

	this.draw = function(){
		push();
		var spectrum = fourier.analyze();
		noStroke();
		
		fill(0,255,0)
		for (var i = 0; i< spectrum.length; i++){
		    var x = map(i, 0, spectrum.length, 0, height);
		    var h = map(spectrum[i], 0, 255, 0, width);
		    rect(0, x, h,  height/spectrum.length);
  		}
	
		pop();
	};
}
