/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package PacoteXML;

import java.util.ArrayList;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.w3c.dom.Text;

/**
 *
 * @author HoxPJ
 */
public class AUX {
    
    public static ArrayList<String> titulos(Document doc){
        ArrayList<String> titulos = new ArrayList<>();
        Element raiz = doc.getDocumentElement();
        //iterar entre todos os elementos filhos da raiz;
        NodeList lembretes = raiz.getChildNodes();
        
        for(int i=0; i< lembretes.getLength(); i++){
            Node node = lembretes.item(i);
            if(node.getNodeType()==Node.ELEMENT_NODE && node.getNodeName().toUpperCase().equals("LEMBRETE"))
            {
                NodeList nodeListFilhos = node.getChildNodes();
                
                for(int j=0; j<nodeListFilhos.getLength();j++){
                    Node nodeFilho2=nodeListFilhos.item(j);
                    if(nodeFilho2.getNodeType()==Node.ELEMENT_NODE && nodeFilho2.getNodeName().toUpperCase().equals("TITULO"))
                    {
                        titulos.add(nodeFilho2.getFirstChild().getNodeValue());
                        break;
                    }
                }
            }
        }
        return titulos;
    }
    //*/
    public static Document titulosXML(Document doc){
        Element raiz = doc.getDocumentElement();
        NodeList filhos1 = raiz.getChildNodes();
        ArrayList<String> listaDeTitulos = new ArrayList<>();
        for(int i=0; i<filhos1.getLength();i++){
            Node filho1 = filhos1.item(i);
            if(filho1.getNodeType()==Node.ELEMENT_NODE && filho1.getNodeName().toUpperCase().equals("LEMBRETE"))
            {
                NodeList filhos2 = filho1.getChildNodes();
                for(int j=0; j<filhos2.getLength();j++){
                    Node filho2 = filhos2.item(j);
                    if(filho2.getNodeType()==Node.ELEMENT_NODE && filho2.getNodeName().toUpperCase().equals("TITULO"))
                    {
                        listaDeTitulos.add(filho2.getFirstChild().getNodeValue());
                        break;
                    }
                }
            }
        }
        //todos os filhos (titulos) estão no array
        doc.removeChild(raiz);
        Element noTitulos=doc.createElement("titulos");
        doc.appendChild(noTitulos);
        for(int i=0; i<listaDeTitulos.size();i++){
            Element noTitulo=doc.createElement("titulo");
            doc.getFirstChild().appendChild(noTitulo);
            Text noTexto=doc.createTextNode(listaDeTitulos.get(i));
            doc.getFirstChild().getChildNodes().item(doc.getFirstChild().getChildNodes().getLength()-1).appendChild(noTexto);
            //documento->raiz(titulos)->titulo[titulo.size()-1].appenchild(texto)            
        }
        return doc;
    }
    
    public static Document lembreteXML(Document doc, String titulo){
        Element raiz = doc.getDocumentElement();
        NodeList filhos1 = raiz.getChildNodes();
        ArrayList<String> nomeElementos = new ArrayList<>();
        ArrayList<String> valorElementos = new ArrayList<>();
        for(int i=0;i<filhos1.getLength();i++){
            Node filho1 = filhos1.item(i);
            boolean found= false;
            if(filho1.getNodeType()==Node.ELEMENT_NODE && filho1.getNodeName().toUpperCase().equals("LEMBRETE"))
            {
                NodeList filhos2 = filho1.getChildNodes();
                for(int j=0; j<filhos2.getLength();j++){
                    Node filho2 = filhos2.item(j);
                    
                    if(filho2.getNodeType()==Node.ELEMENT_NODE){
                        nomeElementos.add(filho2.getNodeName());
                                //se o valor não for nulo
                        if(filho2.getFirstChild().getNodeValue()!=null)
                            valorElementos.add(filho2.getFirstChild().getNodeValue());
                        else
                            valorElementos.add(" ");
                        if(filho2.getNodeName().equalsIgnoreCase("titulo") && filho2.getFirstChild().getNodeValue().equals(titulo))
                        {
                            found=true;
                        }
                        if(filho2.getNodeName().equalsIgnoreCase("titulo") && !filho2.getFirstChild().getNodeValue().equals(titulo))
                        {
                            found=false;
                            break;
                        }
                    }
                }
                if(found){
                    break;
                }else{
                    nomeElementos=new ArrayList<>();
                    valorElementos=new ArrayList<>();
                }
            }
        }
        //apagar o documento.
        doc.removeChild(raiz);
        
        //preenche o novo documento.
        Element noElemento=doc.createElement("lembrete");
        doc.appendChild(noElemento);
        for(int i=0; i<nomeElementos.size();i++){
            Element noElementoFilho=doc.createElement(nomeElementos.get(i));
            Text noTexto=doc.createTextNode(valorElementos.get(i));
            doc.getFirstChild().appendChild(noElementoFilho);
            doc.getFirstChild().getChildNodes().item(doc.getFirstChild().getChildNodes().getLength()-1).appendChild(noTexto);
        }
                
        return doc;
    }
}
