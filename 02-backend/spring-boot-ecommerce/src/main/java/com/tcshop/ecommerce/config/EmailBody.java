package com.tcshop.ecommerce.config;

import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailBody {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendOtp(String email,String otp) throws MessagingException {
          SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
          simpleMailMessage.setTo(email);
          simpleMailMessage.setSubject("Account Verification");
          simpleMailMessage.setText("Hello, your Otp code to verify you account is: "+otp);

//            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
//            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
//            messageHelper.setTo(email);
//            messageHelper.setSubject("Verify Otp Code");
//            messageHelper.setText("""
//                    <div>
//                        <a href="http://localhost:8080/verify?email=%&otp=%s" target="_blank">Click Link!</a>
//                    </div>
//                    """.formatted(email,otp),true);
        javaMailSender.send(simpleMailMessage);
    }
}
