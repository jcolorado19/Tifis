var tablero, direccion, ejes, caminar, liveTifis, liveLiza, mensaje;
var valoresX = new Array(10);
var valoresY = new Array(10);

var fondo = 
{
	imagenURL: "img/fondo.png",
	imagenOk: false
};
var tifis =
{
	x: 450,
	y: 0,
	tifisURL: "img/diana-frente.png",
	cofirmar: false,
	atrasOk: false,
	derOk: false,
	izqOk: false,
	botonOk: false,
	vida: 100,
	velocidad: 50
};

var teclas =
{
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
}

var liza = 
{
	lizaURL: "img/liz.png",
	lizaconfir: false,
	velocidadTifis: 50,
	bandera: false,
	iniciarCamino: false
};


var liziX = Math.floor(Math.random()* (9 - 0 + 1) + 0);
var liziY = Math.floor(Math.random()* (9 - 0 + 1) + 0);

for(var i= 0; i < (500/50); i++)
{
	valoresX[i] = 50 * i;
	valoresY[i] = 50 * i;
}


function inicio()
{
	var canvas = document.getElementById("campo");
	liveTifis = document.getElementById("vidaTifis");
	liveLiza = document.getElementById("vidaLiza");
	mensaje = document.getElementById("llegada");

	
	tablero = canvas.getContext("2d");

	liveTifis.innerHTML = "Vida Tifis: "+tifis.vida + "%";
	fondo.imagen = new Image();
	fondo.imagen.src = fondo.imagenURL;
	fondo.imagen.onload = confirmarFondo;

	tifis.frente = new Image();
	tifis.frente.src = tifis.tifisURL;
	tifis.frente.onload = confirmarFrente;

	tifis.atras = new Image();
	tifis.atras.src = "img/diana-atras.png";
	tifis.atras.onload = confirmarAtras;

	tifis.der = new Image();
	tifis.der.src = "img/diana-der.png";
	tifis.der.onload = confirmarAtras;

	tifis.izq = new Image();
	tifis.izq.src = "img/diana-izq.png";
	tifis.izq.onload = confirmarAtras;

	liza.mala = new Image();
	liza.mala.src = liza.lizaURL;
	liza.mala.onload = confirmarLiza;

	tifis.boton = new Image();
	tifis.boton.src = "img/stop.png";
	tifis.boton.onload = confirmarBoton;



	document.addEventListener("keydown", teclado);

}

function teclado(datos)
{
	var codigo = datos.keyCode;

	if(codigo == teclas.UP)
	{
		if((tifis.x<=100 && tifis.y==250) || tifis.y==0 ||(tifis.x==200 && tifis.y==250) ||(tifis.x>=150 &&tifis.x<=450 && tifis.y==400))
		{
			
			tifis.y += tifis.velocidad;
		}
		tifis.y -= tifis.velocidad;
	}

	if(codigo == teclas.DOWN)
	{
		if((tifis.x<=100 && tifis.y==150) || tifis.y==450 ||(tifis.x>=150 &&tifis.x<=450 && tifis.y==300))
		{
			
			tifis.y -= tifis.velocidad;
		}
		tifis.y += tifis.velocidad;
	}

	if(codigo == teclas.LEFT)
	{
		if((tifis.x == 250 && tifis.y <=200 ) || tifis.x ==0 || (tifis.x==150 && tifis.y==200))
		{
			tifis.x += tifis.velocidad;
		}
		
		tifis.x -= tifis.velocidad;

	}

	if(codigo == teclas.RIGHT)
	{
		if((tifis.x == 150 && tifis.y <=200 ) || tifis.x ==450 || (tifis.x==100 && tifis.y==350))
		{
			tifis.x -= tifis.velocidad;
		}
		
		tifis.x += tifis.velocidad;
		
		
	}
	direccion = codigo;

	dibujar();
}

function confirmarFondo()
{
	fondo.imagenOk = true;
	dibujar();
	
}
function confirmarFrente()
{
	tifis.confirmar = true;
	dibujar();
}

function confirmarAtras()
{
	tifis.atrasOk = true;
	dibujar();
}

function confirmarBoton()
{
	tifis.botonOk = true;
	dibujar();
}


function confirmarLiza()
{
	liza.lizaconfir = true;

	caminar = Math.floor(Math.random()* (1 - 0 + 1) + 0);
	if(caminar == 1)
	{
		liza.bandera = true;
	}

	dibujar();
}

function dibujar()
{
	if(fondo.imagenOk == true)
	{
		tablero.drawImage(fondo.imagen, 0, 0);
		
	}

	for(var j = 0; j < 5; j++)
	{
		liziX = Math.floor(Math.random()* (9 - 0 + 1) + 0);
		liziY = Math.floor(Math.random()* (9 - 0 + 1) + 0);
		caminar = Math.floor(Math.random()* (1 - 0 + 1) + 0);
		llamandoAliza();
	}
	

	if(tifis.botonOk == true)
	{
		tablero.drawImage(tifis.boton, 450, 450);

	}

	if(tifis.vida == 0)
	{
		document.removeEventListener("keydown", teclado);
		mensaje.innerHTML = "<h1>LO SENTIMOS HAS PERDIDO</h1>";
	}

	if(tifis.x == 450 && tifis.y == 450)
	{
		document.removeEventListener("keydown", teclado);
		mensaje.innerHTML = "<h1>FELICITACIONES HAS GANADO</h1>";
	}

	var tifiDibujo = tifis.frente;
	if(tifis.confirmar == true)
	{
		if(direccion == teclas.UP)
		{
			tifiDibujo = tifis.atras;
		}

		if(direccion == teclas.LEFT)
		{
			tifiDibujo = tifis.izq;
		}

		if(direccion == teclas.RIGHT)
		{
			tifiDibujo = tifis.der;
		}

		tablero.drawImage(tifiDibujo, tifis.x, tifis.y);
		
		liza.iniciarCamino = true;


	}

}

function llamandoAliza()
{
	if(liza.lizaconfir == true)
	{
		if(liza.iniciarCamino == true)
		{
			if(liza.bandera == false && valoresX[liziX] < 450)
			{
				valoresX[liziX] += 50;
			}
			if(liza.bandera == true && valoresY[liziY] < 450)
			{
				valoresY[liziY] += 50;
			}
		}

		if(valoresX[liziX] == 450 || valoresY[liziY] == 450)
		{
			liziX = Math.floor(Math.random()* (9 - 0 + 1) + 0);
			liziY = Math.floor(Math.random()* (9 - 0 + 1) + 0);
			caminar = Math.floor(Math.random()* (1 - 0 + 1) + 0);
			if(caminar == 1)
			{
				liza.bandera = true;
			}
		}
		
		if(tifis.x == valoresX[liziX] && tifis.y == valoresY[liziY])
		{
			tifis.vida -= 20;
			liveTifis.innerHTML = "Vida Tifis: "+tifis.vida + "%";
		}
		tablero.drawImage(liza.mala, valoresX[liziX], valoresY[liziY]);

	}
	

}
