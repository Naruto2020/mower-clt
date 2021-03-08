// initialisation des variables 
let divs = document.querySelectorAll("div")
let pelouse = divs[3];
    pelouse.style = "width:500px; height:500px; background-color: green;"
let affiche = divs[5];
let tond = divs[4];
    tond.style = "top:489px ; left:0px";

let degres = 0; 
let direction ;
let intervalId;
let rotate = false;   

// alerte instruction 
alert(
    "Bienvenu sur ce mini site test le carré en bleu représente une tondeuse que vous pouvez déplacer avec les touches D, G et A. D et G permettent respectivement de faire une rotation de 90° sur la droite ou sur la gauche et A permet d'avancer. vous avez un afficheur qui vous donne la position de l'aspirateur à chaque déplacement "
);

// initialisation de la surface 
const Land = function(longueur, largeur, couleur){
    this.longueur = longueur;
    this.largeur = largeur;
    this.couleur = couleur;
}

// création de l'objet lan qui est une instance de de Land
const land = new Land(500, 500, "green");

// initialisation de la tondeuse 
const Mower = function(x,y,orientation,longueur, largeur, vitX,vitY){
    this.x = x;
    this.y = y;
    this.longueur = longueur;
    this.largeur = largeur;
    this.orientation = orientation;
    this.vitX = vitX;
    this.vitY = vitY;
}

const mower = new Mower(0,0,{nord:"N", sud:"S", est:"E", ouest:"W"}, 10, 10 ,0,0);

// gestion des évènements lié aux claviers;
window.onkeydown = (event)=>{
    var code = event.keyCode;
    switch(code){
        case 68: // touche D
            if(!rotate){                
                rotate = true;
                rotationD();
                //direction = tondeuse.orientation.est
            }else{
                rotationD();
                //direction = tondeuse.orientation.sud;
            }
            
          break;  

        case 71: // touche G
            if(!rotate){
                rotate = true;
                rotationG();
                //direction = tondeuse.orientation.ouest
            }else{
                rotationG();
                //direction = tondeuse.orientation.sud;
            }

          break;    

        case 65: // touche A 
            // initialisation des bords de la tondeuse 
            let tondT = parseFloat(tond.style.top);
            let tondB = tondT + mower.longueur;
            let tondL = parseFloat(tond.style.left);
            let tondR = tondL + mower.largeur;
            if(degres === 0 || degres === 360 || degres === -360){
            

                if(tondB + mower.vitY <= mower.longueur + 1){
                    mower.vitY = 0;
                }else{
                    mower.vitY = 1;
                }
                direction = mower.orientation.nord;
                mower.y += mower.vitY;
                tond.style.top = tondT - mower.vitY + "px";
                
            }
            
            if(degres === 90 || degres === 450 || degres === -270){
                if(tondL + mower.vitX >= land.largeur - 11){
                    mower.vitX = 0;
                }else{
                    mower.vitX = 1;
                }
                direction = mower.orientation.est
                mower.x += mower.vitX;
                tond.style.left = tondL + mower.vitX + "px";
            }
            
            if(degres === 180 || degres === 540 || degres === -180 || degres === -540){
                if(tondT + mower.vitY >= land.longueur - 11){
                    mower.vitY = 0;
                    console.log("test")
                }else{
                    mower.vitY = 1 ;
                }
                mower.y -= mower.vitY;
                direction = mower.orientation.sud;
                tond.style.top = tondT + mower.vitY + "px";
            }
            
            if(degres === 270 || degres === 630 || degres === -90 || degres === -450){
                if(tondR +mower.vitX <=mower.largeur + 1){
                    console.log("test");
                   mower.vitX = 0;
                }else{
                   mower.vitX = 1;

                }
               mower.x -=mower.vitX;
                direction =mower.orientation.ouest;
                tond.style.left = tondL -mower.vitX + "px";
            }
        break;    
    }
    affichage();

};

// gestion des rotations
let rotationD = ()=>{
    degres+=90;
    tond.style.transform = 'rotate(' + degres + 'deg)';
    if(direction === mower.orientation.nord){
        direction = mower.orientation.est;

    }else if(direction === mower.orientation.est){
        direction = mower.orientation.sud;

    }else if(direction === mower.orientation.sud){
        direction = mower.orientation.ouest;

    }else if(direction === mower.orientation.ouest){
        direction = mower.orientation.nord;

    }else{
        direction = mower.orientation.est;
    }
        
};
//webkitTransform
let rotationG = ()=>{
    degres-=90;
    tond.style.transform = 'rotate(' + degres + 'deg)';

    if(direction === mower.orientation.nord){
        direction = mower.orientation.ouest;

    }else if(direction === mower.orientation.ouest){
        direction = mower.orientation.sud;

    }else if(direction === mower.orientation.sud){
        direction = mower.orientation.est;

    }else if(direction === mower.orientation.est){
        direction = mower.orientation.nord;

    }else{
        direction = mower.orientation.ouest;
    }
};

// gestion de l'affichage
let affichage = ()=>{
    let message = "position :" + " " + mower.x + mower.y   + " " + direction;

    affiche.innerHTML = message;
};