package com.tcshop.ecommerce.util;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.Document;
import java.io.StringReader;
import org.xml.sax.InputSource;

public class UnsafeXMLParser {

    public Document parseXML(String xmlString) throws Exception {
        DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
        
        // Introducing XXE vulnerability
        documentBuilderFactory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", false);
        documentBuilderFactory.setFeature("http://xml.org/sax/features/external-general-entities", true);
        documentBuilderFactory.setFeature("http://xml.org/sax/features/external-parameter-entities", true);
        
        DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
        Document document = documentBuilder.parse(new InputSource(new StringReader(xmlString)));
        
        return document;
    }
}
