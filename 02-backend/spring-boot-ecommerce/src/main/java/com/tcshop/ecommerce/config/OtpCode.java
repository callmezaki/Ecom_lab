package com.tcshop.ecommerce.config;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class OtpCode {

    public String generateOtp(){
        Random random = new Random();
        //99999 - 5 digit code number limit.
        int randomNumber = random.nextInt(99999);
        String output = Integer.toString(randomNumber);
        while (output.length()<5){
            output = "0" + output;
        }
        return  output;
    }
}
