package com.ssafy.memetionary.util;

import com.ssafy.memetionary.oauth2.token.JwtTokenService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class HeaderUtils {
    private final JwtTokenService jwtTokenService;

    public HeaderUtils(JwtTokenService jwtTokenService) {
        this.jwtTokenService = jwtTokenService;
    }

    public String getMemberId(String authorizationHeader) {
        String accessToken = authorizationHeader.substring(7);
        return jwtTokenService.findMemberId(accessToken);
    }

    public String getClientIP(HttpServletRequest request) {
        String clientIP1 = request.getRemoteAddr();
        String clientIP2 = request.getHeader("X-Forwarded-For");
        log.debug("clientIP1 = " + clientIP1);
        log.debug("clientIP2 = " + clientIP2);
        return clientIP2 != null ? clientIP2 : clientIP1;
    }
}