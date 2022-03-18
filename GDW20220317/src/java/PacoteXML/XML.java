/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package PacoteXML;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
/**
 *
 * @author HoxPJ
 */
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.xml.sax.SAXException;
public class XML {

    private Document doc;
    
    public XML(String caminho) throws SAXException, IOException, ParserConfigurationException {
        //Construtor do tratarLembrete
        DocumentBuilder construtor=DocumentBuilderFactory.newDefaultInstance().newDocumentBuilder();
        this.setDoc(construtor.parse(caminho));
    }
    
    public void serealizar(PrintWriter saida,Node no) throws TransformerException {        
        TransformerFactory tFactory= TransformerFactory.newInstance();
        Transformer trans = tFactory.newTransformer();
        DOMSource fonte = new DOMSource(no);
        StreamResult resultado = new StreamResult(saida);
        trans.transform(fonte, resultado);
    }

    public Document getDoc() {
        return doc;
    }

    public void setDoc(Document doc) {
        this.doc = doc;
    }
    
    
        
    
}
