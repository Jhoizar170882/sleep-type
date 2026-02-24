import pytest
from scoring import calculate_chronotype, VALID_QUESTION_IDS, VALID_OPTION_IDS, QUESTION_SCORES


class TestCalculateChronotype:
    def _all_same_option(self, option_id: str):
        return [{"questionId": i, "optionId": option_id} for i in range(1, 11)]

    def test_all_a_returns_lion(self):
        result = calculate_chronotype(self._all_same_option("a"))
        assert result["chronotype"] == "lion"

    def test_all_b_returns_bear(self):
        result = calculate_chronotype(self._all_same_option("b"))
        assert result["chronotype"] == "bear"

    def test_all_c_returns_wolf(self):
        result = calculate_chronotype(self._all_same_option("c"))
        assert result["chronotype"] == "wolf"

    def test_all_d_returns_dolphin(self):
        result = calculate_chronotype(self._all_same_option("d"))
        assert result["chronotype"] == "dolphin"

    def test_invalid_question_id_raises(self):
        with pytest.raises(ValueError, match="Invalid questionId"):
            calculate_chronotype([{"questionId": 99, "optionId": "a"}])

    def test_invalid_option_id_raises(self):
        with pytest.raises(ValueError, match="Invalid optionId"):
            calculate_chronotype([{"questionId": 1, "optionId": "z"}])

    def test_scores_are_non_negative(self):
        result = calculate_chronotype(self._all_same_option("a"))
        for animal, score in result["scores"].items():
            assert score >= 0, f"{animal} score should be non-negative"

    def test_mixed_answers(self):
        answers = [
            {"questionId": i, "optionId": opt}
            for i, opt in zip(range(1, 11), ["a", "b", "c", "d", "a", "b", "c", "d", "a", "b"])
        ]
        result = calculate_chronotype(answers)
        assert result["chronotype"] in ["lion", "bear", "wolf", "dolphin"]

    def test_valid_question_ids_complete(self):
        assert VALID_QUESTION_IDS == set(range(1, 11))

    def test_valid_option_ids(self):
        assert VALID_OPTION_IDS == {"a", "b", "c", "d"}

    def test_all_questions_have_all_options(self):
        for q_id in VALID_QUESTION_IDS:
            for opt_id in VALID_OPTION_IDS:
                assert opt_id in QUESTION_SCORES[q_id], f"Q{q_id} missing option {opt_id}"
