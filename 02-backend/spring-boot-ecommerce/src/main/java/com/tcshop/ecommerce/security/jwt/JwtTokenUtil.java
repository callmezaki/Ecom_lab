package com.tcshop.ecommerce.security.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.tcshop.ecommerce.entity.User;

@Component
public class JwtTokenUtil {


    private static final long serialVersionUID = -2550185165626007488L;

    public static final long JWT_TOKEN_VALIDITY = 5*60*60;

    @Value("${jwt.secret}")
    private String secret;

    public String getUsernameFromToken(String token) {
        return getDecodedToken(token).getSubject();
    }

    public String createJWT(User user){
        Algorithm algo = Algorithm.HMAC256(this.secret.getBytes());
        String token = JWT.create()
                .withSubject(user.getEmail())
                .withClaim("scope", "user")
                .sign(algo);
        return token;
    }

    public DecodedJWT getDecodedToken(String token){
        try {
            Algorithm algo = Algorithm.HMAC256(this.secret.getBytes());
            JWTVerifier verifier = JWT.require(algo).build();
            DecodedJWT decodedJWT = verifier.verify(token);
            return decodedJWT;
        }catch (Exception exception){
            return null;
        }
    }

}
