package com.example.Kernel.Shop.controller;

import com.example.Kernel.Shop.entity.Review;
import com.example.Kernel.Shop.repository.ReviewRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    private final ReviewRepository reviewRepository;

    public ReviewController(ReviewRepository reviewRepo) {
        this.reviewRepository = reviewRepo;
    }

    @PostMapping
    public Review addReview(@RequestBody Review review) {
        review.setDateRate(new Date());
        return reviewRepository.save(review);
    }

    @PutMapping("/{id}")
    public Review updateReview(@PathVariable String id, @RequestBody Review updatedReview) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new RuntimeException("Review not found"));

        review.setComment(updatedReview.getComment());
        review.setScore(updatedReview.getScore());
        review.setDateRate(new Date());

        return reviewRepository.save(review);
    }


    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable String id) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new RuntimeException("Review not found"));
        reviewRepository.delete(review);
    }


    @GetMapping("/product/{productId}")
    public List<Review> listReviewsByProduct(@PathVariable String productId) {
        return reviewRepository.findByProductId(productId);
    }

    @GetMapping("/client/{clientId}")
    public List<Review> listReviewsByClient(@PathVariable String clientId) {
        return reviewRepository.findByClientId(clientId);
    }

}
