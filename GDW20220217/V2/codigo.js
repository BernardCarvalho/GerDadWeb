function mostrar(dados){
	//alert(dados);
    let parser= new DOMParser();
    let docXML=parser.parseFromString(dados,"text/xml");
    let raiz=docXML.documentElement;
    let compromissos=raiz.getElementsByTagName("compromisso");
    //for (let i=0;i<compromissos.length;i++)
    for(let DOMCompromisso of compromissos){
        //let DOMCompromisso=compromissos[i];
        let objCompromisso=pegaCompromisso(DOMCompromisso);
        inserirTr(objCompromisso,document.querySelector("tbody"));
    }
}
function inserirTr(objCompromisso,pai){
    let tr=document.createElement("tr");
    pai.appendChild(tr);
    for(let chave in objCompromisso){
        let noTexto=document.createTextNode(objCompromisso[chave])
        let td=document.createElement("td")
        td.appendChild(noTexto)
        tr.appendChild(td)
    }
    let tdDeletar=document.createElement("td");
    let btDeletar=document.createElement("input");
    btDeletar.type="button";
    btDeletar.value="Deletar";
    btDeletar.onclick=deletar;
    tdDeletar.appendChild(btDeletar);
    tr.appendChild(tdDeletar);
	let tdEditar=document.createElement("td");
	let btEditar=document.createElement("input");
	btEditar.type="button";
	btEditar.value="Editar";
	btEditar.onclick=editar;
	tdEditar.appendChild(btEditar);
	tr.appendChild(tdEditar);
}
function editar(){
	/* Versão 1.0
		//Titulo
		console.log(this.parentNode.parentNode.childNodes[0].childNodes[0]);
		this.parentNode.parentNode.childNodes[0].innerHTML = document.getElementById("titulo").value;
		console.log(document.getElementById("titulo").value);
		//Descricao
		console.log(this.parentNode.parentNode.childNodes[1].childNodes[0]);
		this.parentNode.parentNode.childNodes[1].innerHTML = document.getElementById("descricao").value;
		console.log(document.getElementById("titulo").value);
		//Data
		console.log(this.parentNode.parentNode.childNodes[2].childNodes[0]);
		this.parentNode.parentNode.childNodes[2].innerHTML = document.getElementById("data").value;
		console.log(document.getElementById("titulo").value);
		//Local
		console.log(this.parentNode.parentNode.childNodes[3].childNodes[0]);
		this.parentNode.parentNode.childNodes[3].innerHTML = document.getElementById("local").value;
		console.log(document.getElementById("titulo").value);
	//*/
	///* Versão 2.0
		//alert(this.parentNode.parentNode.childNodes[0]);
		let TituloAtualizado=document.getElementById("titulo").value,
			TituloAntigo=this.parentNode.parentNode.childNodes[0].innerHTML,
			DescricaoAtualizado=document.getElementById("descricao").value,
			DescricaoAntigo=this.parentNode.parentNode.childNodes[1].innerHTML,
			DataAtualizado=document.getElementById("data").value,
			DataAntigo=this.parentNode.parentNode.childNodes[2].innerHTML,
			LocalAtualizado=document.getElementById("local").value,
			LocalAntigo=this.parentNode.parentNode.childNodes[3].innerHTML;
			
			if(TituloAtualizado == "" || DescricaoAtualizado == "" || DataAtualizado == "" || LocalAtualizado=="")
			{
				alert("Dados incompletos, por favor preencha os campos: título, descricao, data e local");
				return;
			}
			
			//alert("'"+LocalAntigo+"'");
		
		let textoCompromissos=localStorage.dados;
		let parser = new DOMParser();
		let docXML = parser.parseFromString(textoCompromissos,"text/xml");
		let raiz=docXML.documentElement;
		
		
		
		let compromissos = raiz.getElementsByTagName("compromisso");
		for(let compromisso = 0; compromisso<compromissos.length;compromisso++){
			
			//alert("Compromisso: "+compromissos[compromisso].innerHTML);
			//alert("Titulo: "+compromissos[compromisso].getElementsByTagName("titulo")[0].firstChild.nodeValue);
			//alert("Descricao: "+compromissos[compromisso].getElementsByTagName("descricao")[0].firstChild.nodeValue);
			//alert("Data: "+compromissos[compromisso].getElementsByTagName("data")[0].firstChild.nodeValue);
			//alert("Local: "+compromissos[compromisso].getElementsByTagName("local")[0].firstChild.nodeValue);
			//*/
			if(	
				compromissos[compromisso].getElementsByTagName("titulo")[0].firstChild.nodeValue == TituloAntigo &&
				compromissos[compromisso].getElementsByTagName("descricao")[0].firstChild.nodeValue == DescricaoAntigo &&
				compromissos[compromisso].getElementsByTagName("data")[0].firstChild.nodeValue == DataAntigo &&
				compromissos[compromisso].getElementsByTagName("local")[0].firstChild.nodeValue == LocalAntigo
			){
				compromissos[compromisso].getElementsByTagName("titulo")[0].firstChild.nodeValue = TituloAtualizado;
				compromissos[compromisso].getElementsByTagName("descricao")[0].firstChild.nodeValue = DescricaoAtualizado;
				compromissos[compromisso].getElementsByTagName("data")[0].firstChild.nodeValue = DataAtualizado;
				compromissos[compromisso].getElementsByTagName("local")[0].firstChild.nodeValue = LocalAtualizado;
				break;
			}
			
		}
		
		
		
		
		
		//Salva os dados
		let serealizador = new XMLSerializer();
		let textoXML = serealizador.serializeToString(docXML);
		localStorage.dados=textoXML;
		document.querySelector("tbody").innerHTML="";
		mostrar(localStorage.dados);
	//*/

	
	
}
function deletar(){

    //botoa.pega o pai que é a TD. pega o pai que é a TR. pega o primeiro filho
    //que é a primeira TD. pega o primeiro filho que é o nó tipo texto. pega o nodeValue
    let textoTitulo=this.parentNode.parentNode.firstChild.firstChild.nodeValue;
    let textoCompromissos=localStorage.dados;
    let parser=new DOMParser();
    let docXML=parser.parseFromString(textoCompromissos,"text/xml");
    let raiz=docXML.documentElement;
    let compromisso=buscaTitulo(raiz,textoTitulo)
    if(compromisso!=null)
    {
        raiz.removeChild(compromisso);
    }
    let serealizador=new XMLSerializer();
    let textoXML=serealizador.serializeToString(docXML);
    localStorage.dados=textoXML;
    document.querySelector("tbody").innerHTML="";
    mostrar(localStorage.dados);
    
}
function buscaTitulo(raiz,textoTitulo){
    let titulos=raiz.getElementsByTagName("titulo");
    //for(let i=0;i<titulos.length;i++)
    //{
    //    let titulo=titulos[i]
    for(let titulo of titulos)
    {
        if(titulo.firstChild.nodeValue==textoTitulo)
            return titulo.parentNode;
    }
    return null;
}
function pegaCompromisso(DOMCompromisso){
    let objCompromisso={};
    objCompromisso.titulo=pegaInformacao(DOMCompromisso,"titulo");
    objCompromisso.descricao=pegaInformacao(DOMCompromisso,"descricao");
    objCompromisso.data=pegaInformacao(DOMCompromisso,"data");
    objCompromisso.local=pegaInformacao(DOMCompromisso,"local");
    return objCompromisso;
}
function pegaInformacao(domCompromisso,elemento){
    return domCompromisso.getElementsByTagName(elemento)[0].
    firstChild.nodeValue;
}
function inserir(){
	let TituloAtualizado=document.getElementById("titulo").value,
	DescricaoAtualizado=document.getElementById("descricao").value,
	DataAtualizado=document.getElementById("data").value,
	LocalAtualizado=document.getElementById("local").value;
	
	if(TituloAtualizado == "" || DescricaoAtualizado == "" || DataAtualizado == "" || LocalAtualizado=="")
	{
		alert("Dados incompletos, por favor preencha os campos: título, descricao, data e local");
		return;
	}
	
	let textoCompromissos = localStorage.dados;
	let parser = new DOMParser();
	let docXML = parser.parseFromString(textoCompromissos, "text/xml");
	let raiz = docXML.documentElement;
	
	let novoCompromisso = document.createElement("compromisso");
	raiz.appendChild(novoCompromisso);
	
	let novoTitulo = document.createElement("titulo");
	novoCompromisso.appendChild(novoTitulo);
	novoTitulo.appendChild(document.createTextNode(document.getElementById("titulo").value));
	
	let novoDesc = document.createElement("descricao");
	novoCompromisso.appendChild(novoDesc);
	novoDesc.appendChild(document.createTextNode(document.getElementById("descricao").value));
	
	let novoData = document.createElement("data");
	novoCompromisso.appendChild(novoData);
	novoData.appendChild(document.createTextNode(document.getElementById("data").value));
	
	let novoLocal = document.createElement("local");
	novoCompromisso.appendChild(novoLocal);
	novoLocal.appendChild(document.createTextNode(document.getElementById("local").value));
	
	
	let serealizador = new XMLSerializer();
	let textoXML = serealizador.serializeToString(docXML);
	localStorage.dados=textoXML;
	
	document.querySelector("tbody").innerHTML="";
    mostrar(localStorage.dados);	
	
	
}
onload=()=>{
	//alert(localStorage.dados);
    if(localStorage.dados!=null)
    {
        let textoCompromissos=localStorage.dados;
        mostrar(textoCompromissos);
    }
    else
    {
        alert("Sem compromissos");
    }
    
};