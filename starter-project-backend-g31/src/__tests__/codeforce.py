# t = int(input())
# for i in range(t):
#     n = input()
#     if len(n) == 1 and int(n[0]) % 2 != 0:
#         print(-1)
#     elif int(n[-1]) % 2 == 0:
#         print(0)
#     elif int(n[0]) % 2 == 0:
#         print(1)
#     else:
#         printed = False
#         for i in range(1, len(n) - 1):
#             if int(n[i]) % 2 == 0:
#                 print(2)
#                 printed = True
#                 break
#         if not printed: 
#             print(-1)

#2
n = int(input())
ax, ay = list(map(int, input().split()))
bx, by = list(map(int, input().split()))
cx, cy = list(map(int, input().split()))
printed = False
if bx < ax and cx <ax or bx>ax and cx>ax:
    if by < ay and cy < ay or by>ay and cy>ay:
        print("YES")
        printed = True

if not printed:
    print("NO")

# #3
# def operate(l, r, s, op, total, nums, memo):
    
#     if l > r or r < l or total < s:
#         return float("inf")
#     if total == s:
#         return op
#     if (l, r) in memo:
#         return memo[(l, r)]
#     left = operate(l+1, r, s, op+1, total - nums[l], nums, memo)
#     right = operate(l, r-1, s, op+1, total - nums[r], nums, memo)
#     memo[(l, r)] = min(left, right)
#     return memo[(l, r)]

# t = int(input())
# for i in range(t):
#     n, s = list(map(int, input().split()))
#     nums = list(map(int, input().split()))
#     minim = operate(0, len(nums)-1, s, 0, sum(nums), nums, {})
#     print(minim if minim != float("inf") else -1)

