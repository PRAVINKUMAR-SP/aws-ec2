package com.example.awslogintest.controller;

import com.example.awslogintest.model.Address;
import com.example.awslogintest.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/addresses")
@CrossOrigin(origins = "*")
public class AddressController {

    @Autowired
    private AddressRepository addressRepository;

    @GetMapping("/user/{email}")
    public ResponseEntity<List<Address>> getAddressesByUser(@PathVariable String email) {
        return ResponseEntity.ok(addressRepository.findByUserEmail(email));
    }

    @PostMapping
    public ResponseEntity<Address> createAddress(@RequestBody Address address) {
        return ResponseEntity.ok(addressRepository.save(address));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Address> updateAddress(@PathVariable Long id, @RequestBody Address addressDetails) {
        Optional<Address> optionalAddress = addressRepository.findById(id);
        if (optionalAddress.isPresent()) {
            Address address = optionalAddress.get();
            address.setFullName(addressDetails.getFullName());
            address.setAddressLine(addressDetails.getAddressLine());
            address.setCity(addressDetails.getCity());
            address.setPincode(addressDetails.getPincode());
            address.setPhone(addressDetails.getPhone());
            return ResponseEntity.ok(addressRepository.save(address));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAddress(@PathVariable Long id) {
        if (addressRepository.existsById(id)) {
            addressRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
