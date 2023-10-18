package com.tcshop.ecommerce.security.jwt;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.tcshop.ecommerce.security.jwt.JwtTokenUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class JWTRequestFilter extends OncePerRequestFilter  {

	
	 @Autowired
	 private JwtUserDetailsService jwtUserDetailsService;
	 
	    @Autowired
	    private JwtTokenUtil jwtTokenUtil;
	    
	    @Override
	    protected void doFilterInternal(HttpServletRequest request,
	                                    HttpServletResponse response, FilterChain chain)
	            throws ServletException, IOException {
	        logger.warn(request.getRequestURI());

	        if(!request.getRequestURI().startsWith("/auth") && !request.getRequestURI().startsWith("/assets")){

	            final String requestTokenHeader = request.getHeader("Authorization");
	            String username = null;
	            String jwtToken = null;
	            if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
	                jwtToken = requestTokenHeader.substring(7);
	                try {
	                    // This validates the jwt signature as well.
	                    username = jwtTokenUtil.getUsernameFromToken(jwtToken);
	                } catch (IllegalArgumentException e) {
	                    System.out.println("Unable to get JWT Token");
	                }
	            } else {
	                logger.warn("JWT Token does not begin with Bearer String");
	            }

	            if (username != null &&
	                    SecurityContextHolder.getContext().getAuthentication() == null) {
	                UserDetails userDetails = this.jwtUserDetailsService.loadUserByUsername(username);

	                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
	                        userDetails, null, userDetails.getAuthorities());

	                usernamePasswordAuthenticationToken
	                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
	            }
	        }
	        chain.doFilter(request, response);
	    }	    
	 
}
