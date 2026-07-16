package com.careerverse.repository;

import com.careerverse.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmailIgnoreCase(String email);
  Optional<User> findByProviderAndProviderId(User.Provider provider, String providerId);
  boolean existsByEmailIgnoreCase(String email);
}
