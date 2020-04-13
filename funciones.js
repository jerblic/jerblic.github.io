/*
*/
var cont = 0;
var cont2 = 0;
var Pp;//variable para almacenar la potencia del primario
var Ps; //variable para almacenar la potencia del secundario
var S; // almacena la sección transversal del núcleo 
var AWG =[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40];
var diametro =[4.115,3.665,3.264,2.906,2.588,2.304,2.052,1.829,1.628,1.450,1.290,1.151,1.024,0.912,0.813,0.724,0.643,0.574,0.511,0.455,0.404,0.361,0.320,0.287,0.254,0.226,0.203,0.180,0.160,0.142,0.127,0.114,0.102,0.089,0.079];
var diametro_sen=["-","-","-","-","-","-","-","-",1.692,1.509,1.349,1.207,1.077,0.963,0.864,0.770,0.686,0.617,0.551,0.493,0.439,0.396,0.356,0.320,0.284,0.254,0.231,0.206,0.183,0.163,0.147,0.135,0.119,0.104,0.094];
var diametro_doble=[4.244,3.787,3.383,3.023,2.703,2.416,2.159,1.935,1.732,1.549,1.384,1.240,1.110,0.993,0.892,0.800,0.714,0.643,0.577,0.516,0.462,0.419,0.373,0.338,0.302,0.274,0.249,0.224,0.198,0.178,0.160,0.145,0.130,0.114,0.102];

function potencia (){
    var voltaje= document.getElementById("Vs").value;//obtenemos el valor del voltaje digitado por el usuario
    var corr = document.getElementById("Is").value;//obtenemos el valor de la corriente digitado por el usuario
    if (voltaje > 0 && corr > 0){  //se crea la condición para evaluar si el usuario digito valores en los campos
        Ps = voltaje * corr; //se calcula la potencia del secundario
        document.getElementById("Ps").value = Ps;// se pasa el valor calculado al campo de texto de potencia
     } else {
        alert("Debe ingresar el valor del voltaje y la corriente en el secundario ")
    }
    return Ps;
 }
function pot_primario (){
    if (Ps > 0){
        // obtenemos el valor seleccionado y lo guardamos en una variable
        var lista = document.getElementById("rendimiento").value;
        var Ppri= (Ps/lista); // calculamos la potencia del primario
        Pp=Math.round(Ppri); // redondeamos al número entero más próximo
        
        document.getElementById("Pp").value = Pp; //asignamos el valor obtenido al campo de texto Pp
        return Pp;
    } else {
        alert("Por favor realice el paso 1, calcule la potencia del secundario." );

    }
    
}
function seccion_nucleo(){
    if (Pp > 0){
        coef=document.getElementById("coeficiente").value;//se obtiene el valor seleccionado del formulario
        S=coef*Math.sqrt(Pp); //se calcula el valor de la sección del núcleo
        S = Math.round(S*100)/100; //con este procediento obtenemos el resultado con 2 decimales 
        document.getElementById("S").value=S;// se pasa el valor al campo de texto S
        var a= Math.sqrt(S); //se saca la raiz cuadrada al valor de S para obtener la dimesión (a)
        a=Math.round(a*10)/10;//redondeamos el número a un decimal.
        var b = a/2; // se obtiene la dimesión (b)
        b=Math.round(b*10)/10;//redondeamos el número a un decimal.
        var c = b; // b,c y f tienen el mismo valor por tanto se asigna el valor de (b)
        var f = b;
        var e = 3*b; // se obtiene la dimesión (e)
        e=Math.round(e*10)/10;//redondeamos el número a un decimal.
        var sup = b*e;// se obtiene el valor de la superficie de ventana.
        sup=Math.round(sup*10)/10;//redondeamos el número a un decimal.
        document.getElementById("cel1").innerHTML=a; // se envía el valor a cada celda de la tabla.
        document.getElementById("cel2").innerHTML=b;
        document.getElementById("cel3").innerHTML=b;
        document.getElementById("cel4").innerHTML=e;
        document.getElementById("cel5").innerHTML=b;
        document.getElementById("cel6").innerHTML=sup;
        return S; //se retorna el valor de S para que se conserve como número.
    } else {
        alert ("Por favor realice el paso 2, calcule la potencia del primario. ");
    }
    
}
function paso_456(){
    if (S>0 && document.getElementById("Vp").value >0){
        var volt = document.getElementById("Vp").value;
        var frec = document.getElementById("frecuencia").value;
        var vuel_voltios = 1/(4.44*0.0001*S*frec);
        vuel_voltios = Math.round(vuel_voltios*100)/100;
        var Np = volt * vuel_voltios;
        Np = Math.round(Np);
        var Ns = document.getElementById("Vs").value * vuel_voltios;
        Ns = Math.round(Ns);
        var Ip = Pp/volt;
        Ip = Math.round(Ip);
        document.getElementById("cel7").innerHTML= vuel_voltios;
        document.getElementById("cel8").innerHTML= Np;
        document.getElementById("cel9").innerHTML= Ns;
        document.getElementById("cel10").innerHTML= Ip;
        document.getElementById("cel11").innerHTML= document.getElementById("Is").value;
    } else {
        alert ("Por favor realice el paso 3, determine la sección del núcleo y/o Digite el voltaje del primario ");
    }
    
}
function diametro_con(){
    if ((document.getElementById("Is").value > 0) && (parseFloat(document.getElementById("cel10").textContent) > 0)){
        var den = document.getElementById("densidad").value;
        var Ip = parseFloat(document.getElementById("cel10").textContent);
        var Is = document.getElementById("Is").value;
        var sup_p = Ip/den;
        sup_p = Math.round(sup_p*1000)/1000;
        var sup_s = Is/den;
        sup_s = Math.round(sup_s*1000)/1000;
        var dia_p = Math.sqrt(4*sup_p/Math.PI);
        dia_p = Math.round(dia_p*1000)/1000;
        var dia_s = Math.sqrt(4*sup_s/Math.PI);
        dia_s = Math.round(dia_s*1000)/1000;
        document.getElementById("diametro_p").value = dia_p;
        document.getElementById("diametro_s").value = dia_s;
        //alert("la cantidad de datos es"+diametro_doble.length)
        var cal = Math.round(-8.623*Math.log(dia_p)+18.203);
        var pos_p = AWG.indexOf(cal);
        var cal2 = Math.round(-8.623*Math.log(dia_s)+18.203);
        var pos_s = AWG.indexOf(cal2);;
        
        document.getElementById("cel12").innerHTML= AWG[pos_p-1];
        document.getElementById("cel16").innerHTML= AWG[pos_p];
        document.getElementById("cel20").innerHTML= AWG[pos_p+1];
        document.getElementById("cel24").innerHTML= AWG[pos_p+2];

        document.getElementById("cel13").innerHTML= diametro[pos_p-1];
        document.getElementById("cel17").innerHTML= diametro[pos_p];
        document.getElementById("cel21").innerHTML= diametro[pos_p+1];
        document.getElementById("cel25").innerHTML= diametro[pos_p+2];
        
        document.getElementById("cel14").innerHTML= diametro_sen[pos_p-1];
        document.getElementById("cel18").innerHTML= diametro_sen[pos_p];
        document.getElementById("cel22").innerHTML= diametro_sen[pos_p+1];
        document.getElementById("cel26").innerHTML= diametro_sen[pos_p+2];
        
        document.getElementById("cel15").innerHTML= diametro_doble[pos_p-1];
        document.getElementById("cel19").innerHTML= diametro_doble[pos_p];
        document.getElementById("cel23").innerHTML= diametro_doble[pos_p+1];
        document.getElementById("cel27").innerHTML= diametro_doble[pos_p+2];
        
                
        document.getElementById("cel28").innerHTML= AWG[pos_s-1];
        document.getElementById("cel32").innerHTML= AWG[pos_s];
        document.getElementById("cel36").innerHTML= AWG[pos_s+1];
        document.getElementById("cel40").innerHTML= AWG[pos_s+2];
        
        document.getElementById("cel29").innerHTML= diametro[pos_s-1];
        document.getElementById("cel33").innerHTML= diametro[pos_s];
        document.getElementById("cel37").innerHTML= diametro[pos_s+1];
        document.getElementById("cel41").innerHTML= diametro[pos_s+2];

        document.getElementById("cel30").innerHTML= diametro_sen[pos_s-1];
        document.getElementById("cel34").innerHTML= diametro_sen[pos_s];
        document.getElementById("cel38").innerHTML= diametro_sen[pos_s+1];
        document.getElementById("cel42").innerHTML= diametro_sen[pos_s+2];

        document.getElementById("cel31").innerHTML= diametro_doble[pos_s-1];
        document.getElementById("cel35").innerHTML= diametro_doble[pos_s];
        document.getElementById("cel39").innerHTML= diametro_doble[pos_s+1];
        document.getElementById("cel43").innerHTML= diametro_doble[pos_s+2];
    } else {
        alert ("Por favor realice el paso 4, 5 y 6, se requiere la corriente del primario y del secundario. ");
    }


}
function paso_8910(){
    if (S>0 && document.getElementById("Vp").value >0){
        var diam_sel_pri=document.getElementById("diametro_sp").value;//se obtiene el valor del diámetro del primario
        var diam_sel_sec=document.getElementById("diametro_ss").value;//se obtiene el valor del diámetro del secundario
        var Scu_p = (Math.PI/4)*Math.pow(diam_sel_pri,2); //se calcula la sección del cobre del primario
        Scu_p = Math.round(Scu_p*100)/100; // se rendoea el valor a 2 decimales
        var Scu_s = (Math.PI/4)*Math.pow(diam_sel_sec,2); //se calcula la sección del cobre del secundario
        Scu_s = Math.round(Scu_s*100)/100; // se rendoea el valor a 2 decimales
        // alert ("la superficie del primario es: "+Scu_p);
        // alert ("la superficie del secundario es: "+Scu_s);
        // se calcula la sección total del cobre
        var STcu = (parseFloat(document.getElementById("cel8").textContent)*Scu_p)+ (parseFloat(document.getElementById("cel9").textContent)*Scu_s); 
        STcu= STcu/100; //pasamos el valor a cm^2
        STcu = Math.round(STcu*100)/100;
        //se calcula el coeficiente de superficie de ventana
        var coef = STcu/(parseFloat(document.getElementById("cel2").textContent)*parseFloat(document.getElementById("cel4").textContent));
        coef= Math.round(coef*100)/100;
        var Es_pri = Math.round(10/diam_sel_pri);//se calcula el número de espiras por centímetro en el primario
        var Es_sec = Math.round(10/diam_sel_sec);//se calcula el número de espiras por centímetro en el secundario
        //se calculan las espiras por capa tanto del primario como del secundario.
        var EsCa_pri = Es_pri * Math.trunc(parseFloat(document.getElementById("cel4").textContent));
        var EsCa_sec = Es_sec * Math.trunc(parseFloat(document.getElementById("cel4").textContent));
        //se calcula el número de capas para cada bobinado
        var No_cap_pri = parseFloat(document.getElementById("cel8").textContent)/EsCa_pri;
        No_cap_pri = Math.ceil(No_cap_pri);
        var No_cap_sec = parseFloat(document.getElementById("cel9").textContent)/EsCa_sec;
        No_cap_sec = Math.ceil(No_cap_sec);   
    
        //se imprimen los valores en el documento HTML o página principal.
        document.getElementById("cel44").innerHTML= STcu;
        document.getElementById("cel45").innerHTML= coef;
        document.getElementById("cel46").innerHTML= EsCa_pri;
        document.getElementById("cel47").innerHTML= EsCa_sec;
        document.getElementById("cel48").innerHTML= No_cap_pri;
        document.getElementById("cel49").innerHTML= No_cap_sec;
    } else{
        alert("Por favor realice el paso 3, determine la sección del núcleo.")
    }
    
}
function aislamiento(){
    
    var carr = parseFloat(document.getElementById("espe_carr").value);
    var pri_sec = parseFloat(document.getElementById("ais_pri_sec").value);
    var cap_pri = parseFloat(document.getElementById("espe_cap_pri").value);
    var cap_sec = parseFloat(document.getElementById("espe_cap_sec").value);
    var esp_ext = parseFloat(document.getElementById("espe_ais_ext").value);
    var ais_total = (carr + pri_sec + cap_pri + cap_sec + esp_ext);
    if (carr <0 || cap_pri<0 || pri_sec<0 || cap_sec<0 || esp_ext<0){
        alert("Debes digitar números positivos, no se aceptan negativos");
        document.getElementById("espe_carr").value = 0;
        document.getElementById("ais_pri_sec").value = 0;
        document.getElementById("espe_cap_pri").value = 0;
        document.getElementById("espe_cap_sec").value = 0;
        document.getElementById("espe_ais_ext").value = 0;

    }else{
        document.getElementById("cel50").innerHTML = ais_total;
    }
    
    
}
function paso_131415(){
    
    var diametro_primario= parseFloat(document.getElementById("diametro_sp").value);
    var diametro_secundario= parseFloat(document.getElementById("diametro_ss").value);
    var capas_primario= parseFloat(document.getElementById("cel48").textContent);
    var capas_secundario=parseFloat(document.getElementById("cel49").textContent);
    var esp_total_aisl= parseFloat(document.getElementById("cel50").textContent);
    var dimension_b=parseFloat(document.getElementById("cel2").textContent);
    var ETcu = (diametro_primario*capas_primario)+(diametro_secundario*capas_secundario);
    var ET = ETcu + esp_total_aisl;
    var ver_esp_vent = ((ET/10)/dimension_b)*100;
    ver_esp_vent = Math.round(ver_esp_vent*100)/100;
    if (diametro_primario<=0 || diametro_secundario<=0 || capas_primario<=0 || capas_secundario<=0 || esp_total_aisl<=0 || dimension_b<=0){
        alert("Por favor realice el paso 3, determine la sección del núcleo.");
    } else {
        document.getElementById("cel51").innerHTML= ETcu;
        document.getElementById("cel52").innerHTML= ET;
        document.getElementById("cel53").innerHTML= ver_esp_vent;
    }
    

}