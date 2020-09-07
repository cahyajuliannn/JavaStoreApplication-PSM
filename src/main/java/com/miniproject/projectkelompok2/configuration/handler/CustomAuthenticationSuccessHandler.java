package com.miniproject.projectkelompok2.configuration.handler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.repository.UserRepository;


public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler{

	@Autowired
	private UserRepository userRepository;
	
	private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException {
		
		handle(request, response, authentication);
        clearAuthenticationAttributes(request);
		
	}


	


	protected void handle(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
		throws IOException{
		
		String targetUrl = determineTargetUrl(authentication);


        HttpSession session = request.getSession();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetail = (UserDetails) auth.getPrincipal();

        User user = userRepository.findByUsername(userDetail.getUsername());

        session.setAttribute("user", user);

        if (response.isCommitted()) {
//            logger.debug(
//                    "Response has already been committed. Unable to redirect to "
//                            + targetUrl);
            return;
        }

        redirectStrategy.sendRedirect(request, response, targetUrl);
		
	}


	protected String determineTargetUrl(Authentication authentication) {
		
		String pathUrl = "/login?error=true";
        List<String> listRole = new ArrayList<>();
        Collection<? extends GrantedAuthority> authorities
                = authentication.getAuthorities();
        
        for (GrantedAuthority grantedAuthority : authorities) {
            listRole.add(grantedAuthority.getAuthority());
        }

        if (listRole.contains("ROLE_SUPERADMIN") || listRole.contains("Administrator")) {
            pathUrl = "/home";
        } else if (listRole.contains("ROLE_USER") || listRole.contains("Customer Service")
        		|| listRole.contains("Store Manager") || listRole.contains("Branch Store Manager")
        		|| listRole.contains("Inventory Control Specialist") || listRole.contains("Finance")
        		|| listRole.contains("Cashier")) {
            pathUrl = "/pilihcabang";
        }
        return pathUrl;
	}
	
	protected void clearAuthenticationAttributes(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
        if (session == null) {
            return;
        }
        session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
		
	}
	
	
	protected RedirectStrategy getRedirectStrategy() {
        return redirectStrategy;
    }
	
	public void setRedirectStrategy(RedirectStrategy redirectStrategy) {
        this.redirectStrategy = redirectStrategy;
    }
	

}
