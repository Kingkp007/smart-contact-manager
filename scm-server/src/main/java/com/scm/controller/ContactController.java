package com.scm.controller;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scm.constants.AccountsConstant;
import com.scm.dto.ContactFormDto;
import com.scm.dto.ContactSearchDto;
import com.scm.dto.ResponseDto;
import com.scm.entities.Contact;
import com.scm.entities.User;
import com.scm.helper.Helper;
import com.scm.service.ContactService;
import com.scm.service.IUserInfoService;
import com.scm.service.ImageService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/user/contacts")
@Validated
public class ContactController {

	private static final Logger logger = LoggerFactory.getLogger(ContactController.class);
	
	@Autowired
	ContactService contactService;
	
	@Autowired
	private IUserInfoService userService;
	
	@Autowired
	private ImageService imageService;
	
	@PostMapping(value="/add", consumes = {"multipart/form-data"})
	public ResponseEntity<ResponseDto> saveContact(@Valid @ModelAttribute ContactFormDto contactForm,Authentication authentication){
		logger.info("Insde saveContact method of ContactController");
		
		String username = Helper.getEmailOfLoggedInUser(authentication);
		logger.info("User logged in : {}",username);
		User user = userService.getUserByEmail(username);

		String fileName = UUID.randomUUID().toString();
//		String fileURLString = imageService.uploadImage(contactForm.getContactImage(),fileName); commenting to avoid creaing unnecessary pages;
		String fileURLString = "https://res.cloudinary.com/dqpy5mywe/image/upload/c_fill,h_500,w_500/241ab7aa-6140-4bd0-a6b5-88c48bea54a0?_a=DAGAACAVZAA0";
		
        Contact contact = new Contact();
        contact.setName(contactForm.getName());
        contact.setFavorite(contactForm.isFavorite());
        contact.setEmail(contactForm.getEmail());
        contact.setPhoneNumber(contactForm.getPhoneNumber());
        contact.setAddress(contactForm.getAddress());
        contact.setDescription(contactForm.getDescription());
        contact.setUser(user);
        contact.setLinkedInLink(contactForm.getLinkedInLink());
        contact.setWebsiteLink(contactForm.getWebsiteLink());
        
        if(contactForm.getContactImage() != null && !contactForm.getContactImage().isEmpty()) {
        logger.info("Image Uploaded: {} " + contactForm.getContactImage().getOriginalFilename());
        contact.setPicture(fileURLString);
        }
		
//		process the form data
		contactService.save(contact);
		logger.info("Contact saved successfully");
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(new ResponseDto(AccountsConstant.STATUS_201,AccountsConstant.MESSAGE_201));
	}
	
	
	
	@GetMapping("/get-contacts")
	public ResponseEntity<Page<Contact>> getContacts(
	    Authentication authentication,
	    @RequestParam(defaultValue = "0") int page,       // Page number (default is 0)
	    @RequestParam(defaultValue = "5") int size,      // Page size (default is 5)
	    @RequestParam(defaultValue = "name") String sortBy, // Field to sort by (default is "name")
	    @RequestParam(defaultValue = "asc") String direction // Sort direction (default is "asc")
	) {
	    logger.info("Inside getContacts method of ContactController");

	    // Get logged-in user's email
	    String username = Helper.getEmailOfLoggedInUser(authentication);
	    logger.info("User logged in: {}", username);

	    // Fetch the user based on email
	    User user = userService.getUserByEmail(username);

	    // Retrieve paginated and sorted contacts
	    Page<Contact> pageContact = contactService.getByUser(user, page, size, sortBy, direction);

	    logger.info("Exiting getContacts method of ContactController");
	    return ResponseEntity
	            .status(HttpStatus.ACCEPTED)
	            .body(pageContact);
	}
	
	
	@GetMapping("/search")
    public ResponseEntity<Page<Contact>> searchHandler(
            @RequestParam(value = "size", defaultValue = AccountsConstant.PAGE_SIZE + "") int size,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "sortBy", defaultValue = "name") String sortBy,
            @RequestParam(value = "direction", defaultValue = "asc") String direction,
            @RequestParam(value = "field", defaultValue = "name") String field,
            @RequestParam(value = "value", defaultValue = "") String value,
            Authentication authentication) {

        logger.info("field {} keyword {}", field, value);
        logger.info("Requestparams are : "+ size + ", "+page + ", "+sortBy +", "+direction);
        var user = userService.getUserByEmail(Helper.getEmailOfLoggedInUser(authentication));

        Page<Contact> pageContact = null;
        if (field.equalsIgnoreCase("name")) {
            pageContact = contactService.searchByName(value, size, page, sortBy, direction,
                    user);
        } else if (field.equalsIgnoreCase("email")) {
            pageContact = contactService.searchByEmail(value, size, page, sortBy, direction,
                    user);
        } else if (field.equalsIgnoreCase("phone")) {
            pageContact = contactService.searchByPhoneNumber(value, size, page, sortBy,
                    direction, user);
        }

        logger.info("pageContact {}", pageContact);

//        model.addAttribute("contactSearchForm", contactSearchForm);
//
//        model.addAttribute("pageContact", pageContact);
//
//        model.addAttribute("pageSize", AppConstants.PAGE_SIZE);

	    return ResponseEntity
	            .status(HttpStatus.ACCEPTED)
	            .body(pageContact);
    }
	
    // detete contact
    @PostMapping("/delete/{contactId}")
    public ResponseEntity<ResponseDto> deleteContact(
            @PathVariable("contactId") String contactId, Authentication authentication) {
        logger.info("Inside deleteContact metod of ContactController");
        contactService.delete(contactId);
        logger.info("contactId {} deleted", contactId);
        return ResponseEntity
	            .status(HttpStatus.CREATED)
	            .body(new ResponseDto(AccountsConstant.STATUS_201,AccountsConstant.MESSAGE_201));
    }
    
    
    
    @PostMapping(value = "/update/{contactId}", consumes = {"multipart/form-data"})
    public ResponseEntity<ResponseDto> updateContact(@PathVariable("contactId") String contactId,
            @Valid @ModelAttribute ContactFormDto contactForm,Authentication authentication) {
    	logger.info("Inside updateContact method of ContactController class");
        var con = contactService.getById(contactId);
        con.setId(contactId);
        con.setName(contactForm.getName());
        con.setEmail(contactForm.getEmail());
        con.setPhoneNumber(contactForm.getPhoneNumber());
        con.setAddress(contactForm.getAddress());
        con.setDescription(contactForm.getDescription());
        con.setFavorite(contactForm.isFavorite());
        con.setWebsiteLink(contactForm.getWebsiteLink());
        con.setLinkedInLink(contactForm.getLinkedInLink());

        // process image:

        if (contactForm.getContactImage() != null && !contactForm.getContactImage().isEmpty()) {
            logger.info("file is not empty");
            String fileName = UUID.randomUUID().toString();
            String imageUrl = imageService.uploadImage(contactForm.getContactImage(), fileName);
//            con.setCloudinaryImagePublicId(fileName);
            con.setPicture(imageUrl);
            contactForm.setPicture(imageUrl);

        } else {
            logger.info("file is empty");
        }

        var updateCon = contactService.update(con);
        logger.info("updated contact {}", updateCon);
        logger.info("Exiting updateContact method of ContactController class");

        return ResponseEntity
		.status(HttpStatus.CREATED)
		.body(new ResponseDto(AccountsConstant.STATUS_201,AccountsConstant.MESSAGE_201));
    }


	
}
