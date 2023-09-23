"use strict";

var canvas;
var gl;
var f;
var loc = 0.0;
var speed = 0.005;
var vertices=[];
var length1,length2;
function sbWebgl(ox,oy,r) {
    var y;
    for(var x = ox-r;x <= ox+r; x += 0.001) {
        y = Math.sqrt(r*r-Math.abs(ox-x)*Math.abs(ox-x));
        vertices.push(x);
        vertices.push(y+oy);
        vertices.push(0.133);
        vertices.push(0.694);
        vertices.push(0.298);
        vertices.push(x);
        vertices.push(-y+oy);
        vertices.push(0.133);
        vertices.push(0.694);
        vertices.push(0.298);
    }
}

function initRotSquare(){
    canvas = document.getElementById( "rot-canvas" );
    gl = WebGLUtils.setupWebGL( canvas, "experimental-webgl" );
    if( !gl ){
        alert( "WebGL isn't available" );
    }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    var program = initShaders( gl, "rot-v-shader", "rot-f-shader" );
    gl.useProgram( program );
    vertices = [
        -0,0, 1,0.694,0.298,
        -1.3,0.3, 0.133,0.694,0.298,
        -0.3,-0.11, 0.133,0.694,0.298,
        -1,-0.11, 0.133,0.694,0.298,

        -0.3,-0.11, 0.7254,0.4784,0.3411,
        -0.3,-0.28, 0.7254,0.4784,0.3411,
        -1,-0.11, 0.7254,0.4784,0.3411,
        -1,-0.28, 0.7254,0.4784,0.3411,
    ];

    sbWebgl(-0.84,-0.363,0.08);
    length1 = vertices.length;
    sbWebgl(-0.465,-0.363,0.08);
    length2 = vertices.length;

    for(var i = 0;i<vertices.length;i+=5) {
        vertices[i] += loc;

    }

    var FSIZE = 4;
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId);
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );
    var vPosition = gl.getAttribLocation(program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 5*FSIZE, 0 );
    gl.enableVertexAttribArray( vPosition );

    var a_Color = gl.getAttribLocation(program,"a_Color");
    gl.vertexAttribPointer( a_Color, 3, gl.FLOAT, false, 5*FSIZE, 2*FSIZE);
    gl.enableVertexAttribArray( a_Color );
    rend();
}

function f5() {
    loc = 0.0;
    initRotSquare();
    cancelAnimationFrame(f);
}


function renderSquare() {
    initRotSquare();
    rend();
    loc += speed;
    f = window.requestAnimFrame(renderSquare);
}

function rend() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4);
    gl.drawArrays( gl.TRIANGLE_STRIP, 4, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP,8,length1/5-8);
    gl.drawArrays(gl.TRIANGLE_STRIP,length1/5,length2/5-length1/5);
}